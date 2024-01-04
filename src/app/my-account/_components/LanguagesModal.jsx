"use client";
import "../modals.css";
import supabase from '../../api/_db/index.js';
import { AiOutlineClose } from 'react-icons/ai';
import React, { useState, useEffect } from "react";
export default function LanguagesModal({user, handleModal}) {
  const [modalState, setModalState] = useState(false);
  return <main>
  <div className= "overlay">
    <div className="modal">
      LanguagesModal
    </div>
  </div>
</main>;
}
