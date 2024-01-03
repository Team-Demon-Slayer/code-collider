"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import mockData from "./mock-data.js";
import getUserColor from "../../_utils/getUserColor.js";
import formatDate from "../../_utils/formatDate.js";
import supabase from "../../api/_db/index.js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

const { tasks } = mockData;

export default function AddTaskModal({
  date,
  handleShowAddModal,
  handleAddTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState(null);

  const supabseClient = createClientComponentClient();

  const dateFormatted = formatDate(date);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabseClient.auth.getUser();
      if (!user) {
        console.log(user);
        return;
      }
      if (user) {
        const { data: profile } = await supabseClient
          .from("users")
          .select("username")
          .eq("email", user.email)
          .single();
        if (profile) {
          setUsername(profile[0].username);
        }
      }
    };
    fetchUserData();
  }, []);

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
