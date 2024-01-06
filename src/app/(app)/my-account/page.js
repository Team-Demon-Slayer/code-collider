"use client";
import "./page.css";
import supabase from "../api/_db/index.js";
import React, { useState, useEffect } from "react";
import Profile from "./_components/Profile.jsx";
import Languages from "./_components/Languages.jsx";
import Experience from "./_components/Experience.jsx";
import Bio from "./_components/Bio.jsx";
import { getExpandedUser } from "../api/_db/_models/usersModels.js";
export default function Account() {
  const [user, setUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [update, setUpdate] = useState(false);
  const handleUpdate = () => {
    setUpdate(!update);
  };
  const handleUser = (user) => {
    setUser(user);
  };
  const getUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      return;
    }
    const user = await getExpandedUser(data.session.user.id);
    const language_names = [];
    user.languages.map((language) => {
      language.name && language_names.push(language.name);
    });
    setUser(user);
    setLanguages(language_names);
  };
  useEffect(() => {
    getUser();
  }, [update]);
  useEffect(() => {
    getUser();
  }, []);
  return user ? (
    <div className="my-profile-main-container">
      <div className="account-page">
        <div className="column1">
          <Profile user={user} handleUpdate={handleUpdate} />
        </div>
        <div className="column2">
          <Languages
            user={user}
            handleUpdate={handleUpdate}
            languages={languages}
          />
          <Experience user={user} handleUpdate={handleUpdate} />
        </div>
      </div>
      <div className="bio-container">
        <Bio user={user} handleUpdate={handleUpdate} />
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
}
