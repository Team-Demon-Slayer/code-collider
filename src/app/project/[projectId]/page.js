"use client";

import React, { useState, useEffect } from "react";
// import mockData from "./mock-data";
import Deliverables from "./Deliverables.jsx";
import MessageBoard from "./MessageBoard.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
// import messagesModels from "../../api/_db/_models/messagesModels";
// import projectsModels from "../../api/_db/_models/projectsModels";
// import deliverablesModels from "../../api/_db/_models/deliverablesModels";
import supabase from "../../api/_db/index";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getMessages } from "../../api/_db/_models/messagesModels.js";
import { getProject } from "../../api/_db/_models/projectsModels.js";
import { getDeliverables } from "../../api/_db/_models/deliverablesModels.js";

import { v4 as uuidv4 } from "uuid";

import "./style.css";

export default function ProjectPage({ params }) {
  const [project_meta, setProject_meta] = useState(null);
  const [deliverables, setDeliverables] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [user, setUser] = useState(null);

  const supabaseClient = createClientComponentClient();

  const handleMarkComplete = async (taskId) => {
    const { data, error } = await supabase
      .from("deliverables")
      .select("complete")
      .eq("id", taskId);

    if (error) {
      console.log(error);
      return;
    }

    const { error: completeError } = await supabase
      .from("deliverables")
      .update({ complete: !data[0].complete })
      .eq("id", taskId);

    if (completeError) {
      console.log(completeError);
      return;
    }
    setTriggerUpdate(!triggerUpdate);
  };

  const generateDates = (startDate, numberOfDays) => {
    let dates = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < numberOfDays; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const getData = async () => {
    const projectData = await getProject(params.projectId);
    const messageData = await getMessages(params.projectId);
    const deliverablesData = await getDeliverables(
      params.projectId,
      projectData.start_date
    );
    const dates = generateDates(projectData.start_date, 7);
    const structuredDeliverables = dates.map((generatedDate) => {
      const formattedGeneratedDate = generatedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
      const tasksForDate = deliverablesData.filter((deliverable) => {
        const deliverableDateWithoutTime = new Date(deliverable.date)
          .toISOString()
          .split("T")[0]; // Also 'YYYY-MM-DD'
        return deliverableDateWithoutTime === formattedGeneratedDate;
      });
      return {
        date: formattedGeneratedDate,
        tasks: tasksForDate,
      };
    });

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError);
      return;
    }
    setUserId(sessionData.session.user.id);
    setDeliverables(structuredDeliverables);
    setMessages(messageData[0].messages);
    setProject_meta(projectData);
  };

  const handleClaimTask = async (task) => {
    console.log(task);
    if (!task.owner) {
      const { error } = await supabaseClient
        .from("deliverables")
        .update({ owner: username })
        .eq("id", task.id);
      if (error) {
        console.log(error);
        return;
      }

      setTriggerUpdate(!triggerUpdate);
    } else {
      const { error } = await supabaseClient
        .from("deliverables")
        .update({ owner: null })
        .eq("id", task.id);
      if (error) {
        console.log(error);
        return;
      }

      setTriggerUpdate(!triggerUpdate);
    }
  };

  const handleEditTask = async (taskId, newTask) => {
    const { error } = await supabase
      .from("deliverables")
      .update({ title: newTask.title, description: newTask.description })
      .eq("id", taskId);

    if (error) {
      console.log(error);
      return;
    }
    setTriggerUpdate(!triggerUpdate);
  };

  const handleAddTask = async (newTask) => {
    const { error } = await supabase.from("deliverables").insert(newTask);
    if (error) {
      console.log(error);
      return;
    }
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteTask = async (task_id) => {
    // Assuming deliverables is an array of deliverables, each containing a date and an array of tasks

    const { error } = await supabaseClient
      .from("deliverables")
      .delete()
      .eq("id", task_id);

    if (error) {
      console.log(error);
      return;
    }

    setTriggerUpdate(!triggerUpdate);
  };

  const handleUpdateMessages = (newMessages) => {
    setMessages((prevMessages) => [...prevMessages, newMessages]);
    setTriggerUpdate(!triggerUpdate);
  };

  const handleCloseProject = async (complete) => {
    const { error } = await supabase
      .from("projects")
      .update({ active: !complete })
      .eq("id", params.projectId);

    if (error) {
      console.log(error);
      return;
    }

    setTriggerUpdate(!triggerUpdate);
  };

  useEffect(() => {
    getData();
    setIsLoading(false);
  }, [params.projectId]);

  useEffect(() => {
    const getMessagesTrigger = async () => {
      await getData();
    };

    getMessagesTrigger();
  }, [triggerUpdate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
        return;
      }
      const { data: profile } = await supabaseClient
        .from("users")
        .select("username")
        .eq("email", data.session.user.email)
        .single();
      if (profile) {
        setUsername(profile.username);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel(`${project_meta?.project_id}tasks`)
      .on(
        "postgres_changes",
        {
          event: "INSERT, UPDATE",
          schema: "public",
          table: "deliverables",
        },
        (payload) => {
          getData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (isLoading) {
    return <span className="loader"></span>;
  }

  return (
    project_meta &&
    // deliverables &&
    messages && (
      <div className="main-container">
        <div className="project-deliverables-link">
          <ProjectDetails project_meta={project_meta} username={username} />
          <Deliverables
            deliverables={deliverables}
            handleMarkComplete={handleMarkComplete}
            handleClaimTask={handleClaimTask}
            handleEditTask={handleEditTask}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
            project_meta={project_meta}
          />
          <div className="project-footer-btns">
            <a
              href={project_meta.repo_link}
              className="link-project"
              target="_blank"
            >
              LINK TO PROJECT REPO
            </a>
            {project_meta.owner.id === userId && (
              <div
                className={
                  !project_meta.active
                    ? "close-project-btn-false"
                    : "close-project-btn"
                }
                onClick={() => handleCloseProject(project_meta.active)}
              >
                {!project_meta.active ? "Open Project" : "Close Project"}
              </div>
            )}
          </div>
        </div>
        <MessageBoard
          messages={messages}
          project_meta={project_meta}
          handleUpdateMessages={handleUpdateMessages}
        />
      </div>
    )
  );
}
