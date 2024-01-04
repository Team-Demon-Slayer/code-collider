"use client";
import "../page.css";
import supabase from '../../api/_db/index.js';
import React, { useState, useEffect } from "react";
export default function Languages({user}) {
  const [modalState, setModalState] = useState(false);
  const handleModal = () => {
    setModalState(!modalState);
  };
  return <main>
    <div className= "languages-info">
      <div className="languages-header">
        Languages
      </div>
    </div>
  </main>;
}
