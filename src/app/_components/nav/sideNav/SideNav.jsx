"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../nav.css";
import supabase from "../../../api/_db/index.js";
import { useRouter } from "next/navigation";
import { PiDiamondBold } from "react-icons/pi";
import { PiDiamondFill } from "react-icons/pi";
const SideNav = ({ updateTitle, pageTitle, handleSignOut }) => {
  const router = useRouter();
  // const [loggedIn, setLoggedIn] = useState(false);
  // const supabase = createClientComponentClient();
  const handleLinkClick = (title) => {
    updateTitle(title);
  };
  // useEffect(() => {
  //   const checkUser = () => {
  //     const user = supabase.auth.user();
  //     setLoggedIn(!!user);
  //   };

  //   checkUser();

  //   const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setLoggedIn(!!session);
  //   });

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, []);

  const titles = [
    { title: "HOME PAGE", link: "/" },
    { title: "MY PROJECTS", link: "/my-projects" },
    { title: "PROJECT PAGE", link: "/project" },
    { title: "COMMUNITY SHOWCASE", link: "/community/showcase" },
    { title: "BROWSE PROJECTS", link: "/community/browse" },
    { title: "MY ACCOUNT", link: "/my-account" },
  ];

  return (
    <aside className="side-nav">
      <div className="logo">
        <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
      </div>
      <nav>
        {titles.map((title, index) => {
          const active = pageTitle === title.title;
          return (
            <Link
              className="nav-link"
              key={title.title}
              href={`${title.link}`}
              onClick={() => handleLinkClick(title.title)}
            >
              {active ? <PiDiamondFill /> : <PiDiamondBold />} {title.title}
            </Link>
          );
        })}
      </nav>
      <button className="sign-out" onClick={handleSignOut}>
        SIGN OUT
      </button>
    </aside>
  );
};

export default SideNav;
