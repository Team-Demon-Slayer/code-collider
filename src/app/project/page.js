"use client";

import React, { useState, useEffect } from "react";
import mockData from "./mock-data";
import Deliverables from "./Deliverables.jsx";
import MessageBoard from "./MessageBoard.jsx";
import ProjectDetails from "./ProjectDetails.jsx";

import "./style.css";

export default function ProjectPage() {
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
    setDeliverables(mockData.deliverables);
    setMessages(mockData.messages);
    setProject_meta(mockData.project_meta);
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
      <MessageBoard messages={messages} project_meta={project_meta} />
    </div>
  );
}
