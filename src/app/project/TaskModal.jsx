"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import mockData from "./mock-data.js";
import getUserColor from "../_utils/getUserColor.js";

const { tasks } = mockData;

export default function TaskModal({
  task,
  date,
  handleShowModal,
  handleMarkComplete,
  handleClaimTask,
  project_meta,
}) {
  const username = "timBuckToo";
  const userIndex = project_meta.team.indexOf(username);
  const color = getUserColor(userIndex);
  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <FaTimes
          className="close-modal-btn"
          onClick={() => handleShowModal(false)}
        />
        <div className="task-modal-header">
          <div className="task-title">
            <div className="task-due">Due Date - {date}</div>
            {task.title}
            {!task.owner ? (
              <div
                className="claim-task-btn"
                onClick={() => handleClaimTask(username, task.task_id)}
              >
                Claim
              </div>
            ) : (
              <div
                className={`unclaim-task-btn-${color}`}
                onClick={() => handleClaimTask(null, task.task_id)}
              >
                @{task.owner}
              </div>
            )}
          </div>
        </div>
        <div className="task-description-container">
          <p className="task-description-header">Description</p>
          <p className="task-modal-body">{task.description}</p>
        </div>
        <div className="task-modal-footer">
          <button
            onClick={() => handleMarkComplete(task.task_id)}
            className={
              task.complete
                ? "task-modal-complete-btn task-modal-complete-btn-completed"
                : "task-modal-complete-btn"
            }
          >
            {task.complete ? "Completed" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
  );
}
