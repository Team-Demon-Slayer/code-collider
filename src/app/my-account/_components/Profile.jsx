"use client";
import "../page.css";
import React, { useState, useEffect } from "react";
import supabase from "../../api/_db/index.js";
import { FaPencil, FaGraduationCap } from "react-icons/fa6";
export default function Profile({ user }) {
  const [modalState, setModalState] = useState(false);
  const handleModal = () => {
    setModalState(!modalState);
  };
  return (
    <div className="profile-info">
      <div className="profile-header">Profile</div>
      <div className="image-container">
        {user.profile_photo ? (
          <img src={user.profile_photo} className="profile-image" />
        ) : (
          <img
            src="https://i.imgur.com/6VBx3io.jpg"
            className="profile-image"
          />
        )}
        <div className="profile-image-edit-container">
          <FaPencil className="profile-edit-icon" />
        </div>
      </div>
      <div className="profile-username">
        {user.username}
        &ensp;
        {user.is_mentor && <FaGraduationCap className="edit-icon" />}
        <FaPencil className="edit-profile-name" />
      </div>
    </div>
  );
}
