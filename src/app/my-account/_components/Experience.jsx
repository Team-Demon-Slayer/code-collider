"use client";
import "../page.css";
import { AiOutlineClose } from 'react-icons/ai';
import React, { useState, useEffect } from "react";
import supabase from "../../api/_db/index.js";
import { FaPencil } from "react-icons/fa6";
export default function Experience({ user , handleUpdate}) {
  let experience_levels = ["Beginner", "Intermediate", "Advanced"];
  const [editState, setEditState] = useState(false);
  const [experience, setExperience] = useState(user.experience);
  const [initialExperience, setInitialExperience] = useState('');
  const [changed, setChanged] = useState(false);
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
    if (e.target.value === initialExperience) {
      setChanged(false);
    }
    else {
      setChanged(true);
    }
  }
  const handleEdit = () => {
    setEditState(!editState);
    setInitialExperience(user.experience);
    setChanged(false);
  };
  const handleUpdateExperience = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({
        experience: experience,
      })
      .eq('id', user.id)
    handleUpdate();
    handleEdit();
  }
  return (
    <main>
      {!editState ?
      <div className="experience-info">
        <div className="experience-header">
          Experience Level &nbsp;
          <FaPencil className="edit-icon-experience" onClick= {handleEdit} />
        </div>
        <div className="experience-content">{user.experience}</div>
      </div>
      :<div className="experience-info">
        <div className="experience-header">
        Experience Level &nbsp;
        {!editState ? <FaPencil onClick={handleEdit} className="edit-icon-bio"/>:<AiOutlineClose onClick={handleEdit} className="bio-cancel"/>}
        </div>
        <div className="experience-edit-content">
          How experienced are you?
          <div className="experience-level-container">
          {
            experience_levels.map((item, index) => {
              return <div className="experience-level" key={index}>
                <input onClick = {handleExperienceChange} type="radio" id={item} name="experience" value={item} />
                <label htmlFor={item}>{item}</label>
              </div>
            })
          }
          </div>
          {changed&&<button onClick= {handleUpdateExperience} className="experience-save-button">Save</button>}
        </div>
      </div>
        }
    </main>
  );
}
