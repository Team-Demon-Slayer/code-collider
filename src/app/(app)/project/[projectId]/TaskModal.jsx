"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import getUserColor from "../../_utils/getUserColor.js";
import formatDate from "../../_utils/formatDate.js";

import supabase from "../../api/_db/index.js";

export default function TaskModal({
  task,
  date,
  handleShowModal,
  handleMarkComplete,
  handleClaimTask,
  handleEditTask,
  handleDeleteTask,
  project_meta,
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [edit, setEdit] = useState(false);
  const [changes, setChanges] = useState(false);
  const [username, setUsername] = useState(null);

  const userIndex = project_meta.users.findIndex(
    (user) => user.username === task.owner
  );
  const color = getUserColor(userIndex);
  const dateFormatted = formatDate(date);

  const sendUpdate = async () => {
    const newTask = {
      title,
      description,
    };
    await handleEditTask(task.id, newTask);
    setEdit(false);
    setChanges(false);
    handleShowModal(false);
  };

  const deleteAndClose = async () => {
    await handleDeleteTask(task.id);
    handleShowModal(false);
  };

  useEffect(() => {
    if (title !== task.title || description !== task.description) {
      setChanges(true);
    } else {
      setChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description]);

  useEffect(() => {
    if (!edit) {
      setTitle(task.title);
      setDescription(task.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <FaTimes
          className="close-modal-btn"
          onClick={() => handleShowModal(false)}
        />
        {changes && (
          <div className="save-changes-btn" onClick={() => sendUpdate()}>
            Save Changes
          </div>
        )}
        <div className="task-modal-header">
          <div className="task-title">
            <div className="task-due">Due Date - {dateFormatted}</div>
            <div className="task-title-edit">
              <FaEdit
                className={edit ? "edit-task-btn-true" : "edit-task-btn"}
                onClick={() => setEdit(!edit)}
              />
              <input
                type="task"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                disabled={!edit}
                className={!edit ? "task-title-input" : "task-title-input-true"}
              />
            </div>
            {!task.owner ? (
              <div
                className="claim-task-btn"
                onClick={() => handleClaimTask(task)}
              >
                Claim
              </div>
            ) : (
              <div
                className={`unclaim-task-btn-${color}`}
                onClick={() => handleClaimTask(task)}
              >
                @{task.owner}
              </div>
            )}
          </div>
        </div>
        <div className="task-description-container">
          <p className="task-description-header">Description</p>
          <textarea
            className={!edit ? "task-modal-body" : "task-modal-body-true"}
            disabled={!edit}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            {task.description}
          </textarea>
        </div>
        <div className="task-modal-footer">
          <button
            onClick={() => handleMarkComplete(task.id)}
            className={
              task.complete
                ? "task-modal-complete-btn task-modal-complete-btn-completed"
                : "task-modal-complete-btn"
            }
          >
            {task.complete ? "Completed" : "Mark Complete"}
          </button>
          <button
            onClick={() => deleteAndClose()}
            className="task-modal-delete-btn"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
