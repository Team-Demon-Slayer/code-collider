"use client";
import "../page.css";
import React, { useState, useEffect } from "react";
import supabase from "../../api/_db/index.js";
import { FaPencil } from "react-icons/fa6";
export default function Experience({ user }) {
  const [modalState, setModalState] = useState(false);
  const handleModal = () => {
    setModalState(!modalState);
  };
  return (
    <main>
      <div className="experience-info">
        <div className="experience-header">
          Experience Level &nbsp;
          <FaPencil className="edit-icon-experience" />
        </div>
        <div className="experience-content">{user.experience}</div>
      </div>
    </main>
  );
}
