"use client";
import "../page.css";
import React, { useState, useEffect } from "react";
import supabase from "../../api/_db/index.js";
import { FaPencil, FaGraduationCap } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import ProfileModal from "./ProfileModal.jsx";
export default function Profile({ user, handleUpdate }) {
  const [modalState, setModalState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [text, setText] = useState(user.username);
  const [initialText, setInitialText] = useState("");
  const [initialAvatar, setInitialAvatar] = useState("");
  const [changed, setChanged] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (e.target.value === initialText) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  };
  const handleUpdateUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({
        username: text,
      })
      .eq("id", user.id);
    handleUpdate();
    handleEdit();
  };
  const handleEdit = () => {
    setInitialText(user.username);
    setChanged(false);
    setEditState(!editState);
  };
  const handleModal = () => {
    setModalState(!modalState);
    setInitialAvatar(user.profile_photo);
  };
  useEffect(() => {
    const getAvatars = async () => {
      let AvatarList = [];
      const { data, error } = await supabase.storage.from("Profile").list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
      data.map(async (item) => {
        const { data: image } = await supabase.storage
          .from("Profile")
          .getPublicUrl(item.name);
        AvatarList.push(image.publicUrl);
      });
      setAvatarList(AvatarList);
    };
    getAvatars();
  }, []);
  return (
    <div className="profile-info">
      <div className="profile-header">Profile</div>
      <div className="image-container">
        <img src={user.profile_photo} className="profile-image" />
        <div className="profile-image-edit-container" onClick={handleModal}>
          <FaPencil className="profile-edit-icon" />
        </div>
      </div>
      {modalState && (
        <ProfileModal
          user={user}
          handleModal={handleModal}
          avatarList={avatarList}
          handleUpdate={handleUpdate}
        />
      )}
      <div className="profile-name-field">
        <input
          className={editState ? "edit-profile" : "profile-username"}
          onChange={(e) => handleTextChange(e)}
          disabled={!editState}
          defaultValue={user.username}
        />
        {user.is_mentor && <FaGraduationCap className="mentor-icon" />}
        {editState ? (
          <FaCheck className="profile-confirm-btn" onClick={handleUpdateUser} />
        ) : (
          <FaPencil onClick={handleEdit} className="edit-profile-name-btn" />
        )}
      </div>
    </div>
  );
}
