"use client";
import "../modals.css";
import supabase from "../../api/_db/index.js";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from "react";
export default function ProfileModal({
  user,
  handleModal,
  avatarList,
  handleUpdate,
}) {
  const [avatar, setAvatar] = useState(user.profile_photo);
  const [changed, setChanged] = useState(false);
  const handleAvatarChange = (e) => {
    setAvatar(e.target.src);
    if (e.target.src === user.profile_photo) {
      setChanged(false);
    } else setChanged(true);
  };
  const handleUpdateAvatar = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({
        profile_photo: avatar,
      })
      .eq("id", user.id);
    handleUpdate();
    handleModal();
  };
  return (
    <main>
      <div className="modal-overlay" onClick={handleModal}>
        <div className="edit-photo-modal" onClick={(e) => e.stopPropagation()}>
          <div className="edit-modal-header">Select a Profile Photo</div>
          <div className="edit-avatar-list">
            {avatarList.map((item, index) => {
              if(index !==0){
                return (
                  <img
                    key={index}
                    src={item}
                    onClick={handleAvatarChange}
                    alt="avatar"
                    value={item}
                    className={avatar === item ? "avatar-selected" : "avatar"}
                  />
                );
              }
            })}
          </div>
          {changed && (
            <button
              className="edit-profile-photo-confirm"
              onClick={handleUpdateAvatar}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
