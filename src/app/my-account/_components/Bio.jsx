"use client";
import "../page.css";
import React, { useState, useEffect } from "react";
import supabase from '../../api/_db/index.js';
import { FaPencil } from "react-icons/fa6";
export default function Bio({user,handleUpdate}) {
  const [editState, setEditState] = useState(false);
  const [text, setText] = useState(user.bio);
  const [initialText, setInitialText] = useState('');
  const [changed, setChanged] = useState(false);
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value === initialText) {
      setChanged(false);
    }
    else {
      setChanged(true);
    }
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
    handleEdit();
  }
  const handleEdit = () => {
    setInitialText(user.bio);
    setChanged(false);
    setEditState(!editState);
  };
  return <main>
    <div className= "bio-info">
      <div className="bio-header" onClick={handleEdit}>
        Bio
        &nbsp;
        <FaPencil className="edit-icon"/>
      </div>
      <div className="bio-content">
      <textarea className={!editState ? "bio-textarea":"bio-textarea-edit"} placeholder="Write a short bio about yourself..." onChange={(e)=>handleTextChange(e)} disabled={!editState}>{user.bio}</textarea>
       { changed && <button className="save-button" onClick={handleUpdateBio}>Save</button> }
      </div>
    </div>
  </main>;
}
