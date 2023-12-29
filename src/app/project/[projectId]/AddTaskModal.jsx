"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import mockData from "./mock-data.js";
import getUserColor from "../../_utils/getUserColor.js";
import formatDate from "../../_utils/formatDate.js";
import { v4 as uuidv4 } from "uuid";

const { tasks } = mockData;

export default function AddTaskModal({
  date,
  handleShowAddModal,
  handleAddTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dateFormatted = formatDate(date);

  const username = "timBuckToo";

  const sendUpdate = async () => {
    const newTask = {
      title,
      description,
      date,
      task_id: uuidv4(),
      owner: null,
      complete: false,
    };
    await handleAddTask(newTask);
    handleShowAddModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <FaTimes
          className="close-modal-btn"
          onClick={() => handleShowAddModal(false)}
        />
        <div className="task-modal-header">
          <div className="task-title">
            <div className="task-due">Due Date - {dateFormatted}</div>
            <div className="task-title-edit">
              <input
                type="task"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Add a task title..."
                className="add-task-title-input"
              />
            </div>
          </div>
        </div>
        <div className="task-description-container">
          <p className="task-description-header">Description</p>
          <textarea
            className="add-task-modal-body"
            value={description}
            placeholder="Add a task description..."
            onChange={(e) => setDescription(e.target.value)}
          >
            {description}
          </textarea>
        </div>
        <div className="task-modal-footer">
          <button
            onClick={() => sendUpdate()}
            className="task-modal-complete-btn task-modal-complete-btn-completed"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
