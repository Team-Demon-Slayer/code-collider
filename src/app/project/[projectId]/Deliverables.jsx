"use client";

import React, { useState } from "react";
import formatDate from "../../_utils/formatDate.js";
import truncateString from "../../_utils/truncateString.js";
import getUserColor from "../../_utils/getUserColor.js";
import { FaChevronLeft, FaChevronRight, FaPlus, FaCheck } from "react-icons/fa";
import TaskModal from "./TaskModal.jsx";
import AddTaskModal from "./AddTaskModal.jsx";

export default function Deliverables({
  deliverables,
  handleMarkComplete,
  handleClaimTask,
  handleEditTask,
  handleAddTask,
  project_meta,
  handleDeleteTask,
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const handleShowModal = (value) => {
    setShowModal(value);
  };

  const handleShowAddModal = (value) => {
    setShowAddTask(value);
  };

  const handleAddTaskClick = (date) => {
    setSelectedDate(date);
    setShowAddTask(true);
  };

  const handleSelectTask = (task, date) => {
    setSelectedTask(task);
    setSelectedDate(date);
    handleShowModal(true);
  };

  return (
    deliverables.length > 0 && (
      <div className="deliverables-main">
        {showModal && (
          <TaskModal
            task={selectedTask}
            handleShowModal={handleShowModal}
            handleMarkComplete={handleMarkComplete}
            handleClaimTask={handleClaimTask}
            handleEditTask={handleEditTask}
            project_meta={project_meta}
            handleDeleteTask={handleDeleteTask}
            date={selectedDate}
          />
        )}
        {showAddTask && (
          <AddTaskModal
            handleAddTask={handleAddTask}
            date={selectedDate}
            handleShowAddModal={handleShowAddModal}
            projectId={project_meta.id}
          />
        )}
        <div className="deliverables-header">Deliverables & Deadlines</div>
        {deliverables.map((day) => {
          const date = formatDate(day.date);
          return (
            <div className="deliverables-day" key={day.date}>
              <h3>{date}</h3>
              {day.tasks.map((task) => {
                const { complete } = task;
                const title = truncateString(task.title, 20);
                const userIndex = project_meta.users.findIndex(
                  (user) => user.username === task.owner
                );
                const color = getUserColor(userIndex);
                return (
                  <div
                    key={task.id}
                    className="day-task-main"
                    onClick={() => handleSelectTask(task, day.date)}
                    style={{
                      justifyContent: task.owner ? "flex-start" : "center",
                    }}
                  >
                    {complete && <FaCheck className="task-complete" />}
                    {task.owner && (
                      <div className={`task-owner-name-${color}`}></div>
                    )}
                    <p className="day-task-title">{title}</p>
                  </div>
                );
              })}
              <FaPlus
                className="deliverables-day-add-task"
                onClick={() => handleAddTaskClick(day.date)}
              />
            </div>
          );
        })}
        <FaChevronLeft className="deliverables-left-arrow" />
        <FaChevronRight className="deliverables-right-arrow" />
      </div>
    )
  );
}
