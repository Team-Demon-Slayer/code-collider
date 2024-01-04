"use client";
import "../styles.css";
import React, { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
export default function Experience({user}) {
  return <main>
    <div className= "experience-info">
      <div className="experience-header">
        Experience Level
        &nbsp;
        <FaPencil className="edit-icon"/>
      </div>
      <div className="experience-content">
        {user.experience}
      </div>
    </div>
  </main>;
}
