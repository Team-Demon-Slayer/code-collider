"use client";
import "../styles.css";
import React, { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
export default function Bio({user}) {
  return <main>
    <div className= "bio-info">
      <div className="bio-header">
        Bio
        &nbsp;
        <FaPencil className="edit-icon"/>
      </div>
      <div className="bio-content">
        {user.bio}
      </div>
    </div>
  </main>;
}
