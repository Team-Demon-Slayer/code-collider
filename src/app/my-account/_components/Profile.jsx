"use client";
import "../styles.css";
import React, { useState, useEffect } from "react";
import { FaPencil, FaGraduationCap} from "react-icons/fa6";
export default function Profile({user}) {
  return <main>
    <div className= "profile-info">
      <div className="profile-header">
        Profile
      </div>
      <div className="image-container">
        {user.profile_photo?<img src={user.profile_photo} className="profile-image"/>: <img src="https://i.imgur.com/6VBx3io.jpg" className="profile-image"/>}
        <FaPencil className="profile-edit-icon"/>
      </div>
      <div className="profile-username">
            {user.username}
            &ensp;
            {user.is_mentor && <FaGraduationCap className="edit-icon"/>}
        </div>
    </div>
  </main>;
}
