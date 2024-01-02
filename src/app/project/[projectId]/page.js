"use client";

import React, { useState, useEffect } from "react";
import mockData from "./mock-data";
import Deliverables from "./Deliverables.jsx";
import MessageBoard from "./MessageBoard.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
import getMessages from "../../api/_db/_queries/getMessages";
import getProject from "../../api/_db/_queries/getProject";
import getDeliverables from "../../api/_db/_queries/getDeliverables";

import "./style.css";

export default function ProjectPage({ params }) {
  const [project_meta, setProject_meta] = useState(null);
  const [deliverables, setDeliverables] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const handleMarkComplete = (task_id) => {
    deliverables.forEach((deliverable) => {
      deliverable.tasks.forEach((task) => {
        if (task.task_id === task_id) {
          const toggleValue = task.complete === false ? true : false;
          task.complete = toggleValue;
        }
      });
    });
    setTriggerUpdate(!triggerUpdate);
  };

  const getData = async () => {
    const projectData = await getProject(params.projectId);
    const messageData = await getMessages(params.projectId);
    const deliverablesData = await getDeliverables(params.projectId);
    setDeliverables(deliverablesData);
    setMessages(messageData);
    setProject_meta(projectData[0]);
  };

  const handleClaimTask = async (username, task_id) => {
    deliverables.forEach((deliverable) => {
      deliverable.tasks.forEach((task) => {
        if (task.task_id === task_id) {
          task.owner = username;
        }
      });
    });
    setTriggerUpdate(!triggerUpdate);
  };

  const handleEditTask = async (task_id, newTask) => {
    await deliverables.forEach((deliverable) => {
      deliverable.tasks.forEach((task) => {
        if (task.task_id === task_id) {
          task.title = newTask.title;
          task.description = newTask.description;
        }
      });
    });
    setTriggerUpdate(!triggerUpdate);
  };

  const handleAddTask = async (newTask) => {
    await deliverables.forEach((deliverable) => {
      if (deliverable.date === newTask.date) {
        deliverable.tasks.push(newTask);
      }
    });
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteTask = async (task_id, date) => {
    // Assuming deliverables is an array of deliverables, each containing a date and an array of tasks
    deliverables.forEach((deliverable) => {
      // Check if the deliverable matches the specified date
      if (deliverable.date === date) {
        // Filter out the task with the specified task_id
        deliverable.tasks = deliverable.tasks.filter(
          (task) => task.task_id !== task_id
        );
      }
    });

    setTriggerUpdate(!triggerUpdate);
  };

  const handleUpdateMessages = async (newMessages) => {
    setMessages(newMessages);
  };

  useEffect(() => {
    getData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setDeliverables(mockData.deliverables);
  }, [triggerUpdate]);

  if (isLoading) {
    return <span className="loader"></span>;
  }

  return (
    (project_meta, deliverables, messages) && (
      <div className="main-container">
        <div className="project-deliverables-link">
          <ProjectDetails project_meta={project_meta} />
          <Deliverables
            deliverables={deliverables}
            handleMarkComplete={handleMarkComplete}
            handleClaimTask={handleClaimTask}
            handleEditTask={handleEditTask}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
            project_meta={project_meta}
          />
          <a
            href={project_meta.repo_link}
            className="link-project"
            target="_blank"
          >
            LINK TO PROJECT REPO
          </a>
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
