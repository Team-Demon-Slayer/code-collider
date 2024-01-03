"use client";
import React, { useState, useEffect } from "react";
// import { Switch } from 'react-icons/ai';
import { RxSwitch } from "react-icons/rx";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
export default function TopNav({ theme, toggleTheme, avatar, pageTitle }) {
  const [newMessage, setNewMessage] = useState(false);
  const getToggleIcon = () => {
    return theme === "dark" ? faToggleOn : faToggleOff;
  };
  // const [avatar, setAvatar] = useState('');
  // const supabase = createClientComponentClient();
  // const router = useRouter();
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (!user) {
  //       console.log(user);
  //       router.push('/login');
  //       return;
  //     }
  //     if (user) {
  //       const { data: profile } = await supabase
  //         .from('users')
  //         .select('profile_photo')
  //         .eq('email', user[0].email)
  //         .single();

  //       if (profile) {
  //         setAvatar(profile.avatar_url);
  //         // setNewMessage(profile.has_new_message);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [ supabase ]);

  return (
    <header className={`top-nav`}>
      <h1 className="page-title">{pageTitle}</h1>
      <div className="theme-switcher">
        <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
        {/* <RxSwitch className="theme-switch" checked={theme === 'dark'}  onClick={toggleTheme} /> */}
        <FontAwesomeIcon
          icon={getToggleIcon()}
          className="theme-switch"
          checked={theme === "dark"}
          onClick={toggleTheme}
        />
      </div>
      <div className="user-info">
        {avatar && <Image src={avatar} alt="Avatar" className="avatar" />}
        {newMessage && <div className="new-message"></div>}
      </div>
    </header>
  );
}
