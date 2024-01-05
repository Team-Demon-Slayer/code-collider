"use client";
import "../page.css";
import React, { useState, useEffect } from "react";
import supabase from "../../api/_db/index.js";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
export default function Bio({ user, handleUpdate }) {
  const [editState, setEditState] = useState(false);
  const [text, setText] = useState(user.bio);
  const [initialText, setInitialText] = useState("");
  const [changed, setChanged] = useState(false);
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value === initialText) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  };
  const handleUpdateBio = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({
        bio: text,
      })
      .eq("id", user.id);
    handleUpdate();
    handleEdit();
  };
  const handleEdit = () => {
    setInitialText(user.bio);
    setChanged(false);
    setEditState(!editState);
  };
  const handleKeyDown = (event) => {
    if(event.key==='Enter' && text === initialText) {
      handleEdit();
    }
    else if (event.key === 'Enter' ) {
     handleUpdateBio();
    }
  }
  return(
    <div className= "bio-info">
      <div className="bio-header">
        Bio &nbsp;
        {!editState ? <FaPencil onClick={handleEdit} className="edit-icon-bio"/>:<AiOutlineClose onClick={handleEdit} className="bio-cancel"/>}
      </div>
      <div className="bio-content">
      <textarea className={!editState ? "bio-textarea":"bio-textarea-edit"} defaultValue={user.bio} onKeyDown={handleKeyDown} placeholder="Write a short bio about yourself..." onChange={(e)=>handleTextChange(e)} disabled={!editState}></textarea>
       { changed && <button className="save-button" onClick={handleUpdateBio} >Save</button>};
      </div>
    </div>
  );
}
