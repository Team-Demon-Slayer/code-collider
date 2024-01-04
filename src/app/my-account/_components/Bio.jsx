"use client";
import "../page.css";
import React, { useState, useEffect } from "react";
import supabase from '../../api/_db/index.js';
import BioModal from "./BioModal.jsx";
import { FaPencil } from "react-icons/fa6";
export default function Bio({user,handleUpdate}) {
  const [modalState, setModalState] = useState(false);
  const handleModal = () => {
    setModalState(!modalState);
  };
  return <main>
    <div className= "bio-info">
      <div className="bio-header" onClick={handleModal}>
        Bio
        &nbsp;
        <FaPencil className="edit-icon"/>
      </div>
      <div className="bio-content">
        {user.bio}
      </div>
    </div>
    {modalState && <BioModal user={user} handleModal={handleModal} handleUpdate={handleUpdate}/>}
  </main>;
}
