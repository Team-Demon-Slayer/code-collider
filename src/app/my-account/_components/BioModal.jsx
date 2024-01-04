"use client";
import "../modals.css";
import supabase from '../../api/_db/index.js';
import { AiOutlineClose } from 'react-icons/ai';
import React, { useState, useEffect } from "react";

export default function BioModal({user, handleModal,handleUpdate}) {
  const [text, setText] = useState('');
  const [changed, setChanged] = useState(false);
  const handleTextChange = (e) => {
    setText(e.target.value);
    setChanged(true);
  }
  const handleUpdateBio = async () => {
    console.log(text);
    const { data, error } = await supabase
      .from('users')
      .update({
        bio: text,
      })
      .eq('id', user.id)
    handleUpdate();
    handleModal();
  }
  return <main>
    <div className= "overlay">
      <div className="modal">
        <div className="modal-header">
          Tell us about yourself!
        </div>
        <textarea className="textarea" placeholder="Write a short bio about yourself..."  onChange={(e)=>handleTextChange(e)}>{user.bio}</textarea>
       { changed&& <button className="save-button" onClick={handleUpdateBio}>Save</button> }
        <AiOutlineClose className="close-modal" onClick={handleModal}/>
      </div>
    </div>
  </main>;
}
