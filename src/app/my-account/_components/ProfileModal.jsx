"use client";
import "../modals.css";
import supabase from '../../api/_db/index.js';
import { AiOutlineClose } from 'react-icons/ai';
import React, { useState, useEffect } from "react";
export default function ProfileModal({user, handleModal, avatarList, handleUpdate}) {
  const [avatar, setAvatar] = useState(user.profile_photo);
  const [changed, setChanged] = useState(false);
  const handleAvatarChange = (e) => {
    setAvatar(e.target.src);
    if (e.target.src === user.profile_photo) {
      setChanged(false);
    }
    else (
      setChanged(true)
    )
    console.log(user.profile_photo);
  }
  const handleUpdateAvatar = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({
        profile_photo: avatar,
      })
      .eq('id', user.id)
    handleUpdate();
    handleModal();
  }
  return <main>
  <div className= "overlay">
    <div className="modal">
      <div className="modal-header">Select a Profile Photo</div>
      <div className="avatar-list">
      {
        avatarList.map((item, index) => {
          return <img key={index} src={item} onClick={handleAvatarChange} alt="avatar" value={item} className={(avatar===item) ? "avatar-selected":"avatar"}/>;
        })
      }
      </div>
      { changed&& <button className="save-button" onClick={handleUpdateAvatar}>Save</button> }
        <AiOutlineClose className="close-modal" onClick={handleModal}/>
    </div>

  </div>
</main>;
}
