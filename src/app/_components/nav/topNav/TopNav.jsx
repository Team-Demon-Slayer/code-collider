"use client";
import React, { useState, useEffect } from "react";
// import { Switch } from 'react-icons/ai';
import { RxSwitch } from "react-icons/rx";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import "../nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
export default function TopNav({ theme, toggleTheme, avatar, pageTitle }) {
  const [newMessage, setNewMessage] = useState(false);
  const router = useRouter();
  const getToggleIcon = () => {
    return theme === "dark" ? faToggleOn : faToggleOff;
  };
  const navigateToMyAccount = () => {
    router.push("/my-account");
  };
  return (
    <header className={`top-nav`}>
      <h1 className="page-title">{pageTitle}</h1>
      <div className="nav-settings">
        <div className="theme-switcher">
          <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
          <FontAwesomeIcon
            icon={getToggleIcon()}
            className="theme-switch"
            checked={theme === "dark"}
            onClick={toggleTheme}
          />
        </div>
        {avatar && (
          <img
            className="nav-avatar"
            src={avatar}
            alt="avatar"
            onClick={navigateToMyAccount}
          />
        )}
      </div>
    </header>
  );
}
