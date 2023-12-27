"use client";

import React, { useState } from "react";
import formatDate from "../_utils/formatDate.js";
import truncateString from "../_utils/truncateString.js";
import getUserColor from "../_utils/getUserColor.js";
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
  const [prevId, setPrevId] = useState(0);

  const handleShowModal = (value) => {
    setShowModal(value);
  };

  const handleShowAddModal = (value) => {
    setShowAddTask(value);
  };

  const handleAddTaskClick = (date, currentId) => {
    setPrevId(currentId);
    setSelectedDate(date);
    setShowAddTask(true);
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
          handleDeleteTask={handleDeleteTask}
          date={selectedDate}
        />
      )}
      {showAddTask && (
        <AddTaskModal
          handleAddTask={handleAddTask}
          date={selectedDate}
          handleShowAddModal={handleShowAddModal}
          prevId={prevId}
        />
      )}
      <div className="deliverables-header">Deliverables & Deadlines</div>
      {deliverables.map((day) => {
        const date = formatDate(day.date);
        const tasksLength = day.tasks.length - 1;
        return (
          <div className="deliverables-day" key={day.date}>
            <h3>{date}</h3>
            {day.tasks.map((task) => {
              const { complete } = task;
              const title = truncateString(task.title, 20);
              const userIndex = project_meta.team.indexOf(task.owner);
              const color = getUserColor(userIndex);
              return (
                <div
                  key={task.task_id}
                  className="day-task-main"
                  onClick={() => handleSelectTask(task, day.date)}
                  style={{
                    justifyContent: task.owner ? "flex-start" : "center",
                  }}
                >
                  {complete && <FaCheck className="task-complete" />}
                  {task.owner && (
                    <div className={`task-owner-name-${color}`}>
                      @{task.owner}
                    </div>
                  )}
                  <p className="day-task-title">{title}</p>
                </div>
              );
            })}
            <FaPlus
              className="deliverables-day-add-task"
              onClick={() => handleAddTaskClick(day.date, tasksLength)}
            />
          </div>
        );
      })}
      <FaChevronLeft className="deliverables-left-arrow" />
      <FaChevronRight className="deliverables-right-arrow" />
    </div>
  );
}
