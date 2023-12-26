"use client";

import React, { useState } from "react";
import formatDate from "../_utils/formatDate.js";
import truncateString from "../_utils/truncateString.js";
import getUserColor from "../_utils/getUserColor.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TaskModal from "./TaskModal.jsx";

export default function Deliverables({
  deliverables,
  handleMarkComplete,
  handleClaimTask,
  handleEditTask,
  project_meta,
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (value) => {
    setShowModal(value);
  };

  const handleSelectTask = (task, date) => {
    setSelectedTask(task);
    setSelectedDate(date);
    handleShowModal(true);
  };

  return (
    <div className="deliverables-main">
      {showModal && (
        <TaskModal
          task={selectedTask}
          handleShowModal={handleShowModal}
          handleMarkComplete={handleMarkComplete}
          handleClaimTask={handleClaimTask}
          handleEditTask={handleEditTask}
          project_meta={project_meta}
          date={selectedDate}
        />
      )}
      <div className="deliverables-header">Deliverables & Deadlines</div>
      {deliverables.map((day) => {
        const date = formatDate(day.date);
        return (
          <div className="deliverables-day" key={day.date}>
            <h3>{date}</h3>
            {day.tasks.map((task) => {
              const title = truncateString(task.title, 10);
              const userIndex = project_meta.team.indexOf(task.owner);
              const color = getUserColor(userIndex);
              return (
                <div
                  key={task.task_id}
                  className="day-task-main"
                  onClick={() => handleSelectTask(task, date)}
                  style={{
                    justifyContent: task.owner ? "flex-start" : "center",
                  }}
                >
                  {task.owner && (
                    <div className={`task-owner-name-${color}`}>
                      @{task.owner}
                    </div>
                  )}
                  <p className="day-task-title">{title}</p>
                </div>
              );
            })}
          </div>
        );
      })}
      <FaChevronLeft className="deliverables-left-arrow" />
      <FaChevronRight className="deliverables-right-arrow" />
    </div>
  );
}
