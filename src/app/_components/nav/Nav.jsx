"use client";
import React, { useState, useEffect } from "react";
import SideNav from "./sideNav/SideNav.jsx";
import TopNav from "./topNav/TopNav.jsx";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import supabase from "../../api/_db/index.js";
import { useRouter } from "next/navigation";
import "../../globals.css";
import { getMiniUser } from "../../api/_db/_models/usersModels.js";

export default function Nav() {
  const [avatar, setAvatar] = useState("");
  const [currentNavTheme, setCurrentNavTheme] = useState("light");
  const [pageTitle, setPageTitle] = useState("/");
  const [validUser, setValidUser] = useState(false);
  const [triggerSignout, setTriggerSignout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentURL, setCurrentURL] = useState("");
  const [validPath, setValidPath] = useState(false);

  const router = useRouter();
  const supabaseClient = createClientComponentClient();
  function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    body.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
    setCurrentNavTheme(currentTheme === "dark" ? "light" : "dark");
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setTriggerSignout(!triggerSignout);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateTitle = (newTitle) => {
    setPageTitle(newTitle);
  };

  const titles = [
    { title: "HOME PAGE", link: "/" },
    { title: "MY PROJECTS", link: "/my-projects" },
    { title: "PROJECT PAGE", link: "/project" },
    { title: "COMMUNITY SHOWCASE", link: "/community/showcase/1" },
    { title: "BROWSE PROJECTS", link: "/community/browse/1" },
    { title: "CREATE PROJECT", link: "/create-project" },
    { title: "MY ACCOUNT", link: "/my-account" },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;
    const foundTitle = titles.find((titleObj) => titleObj.link === currentPath);

    if (foundTitle) {
      setPageTitle(foundTitle.title);
    } else {
      setPageTitle("/");
    }
  }, [router]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") setCurrentUser(session.user.email);
    });
  }, [supabaseClient, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data.session);
      if (error || !data.session) {
        setValidUser(false);
        router.push("/login");
        return;
      }
      if (data.session.user) {
        const { data: profile } = await supabaseClient
          .from("users")
          .select()
          .eq("id", data.session.user.id)
          .single();

        if (data.session) {
          const userwithavatar = await getMiniUser(data.session.user.id);
          // const avatarUrl = users.github_username
          //   ? `https://github.com/${users.github_username}.png`
          //   : users.photo_url;
          setAvatar(userwithavatar.profile_photo);
        }
        setValidUser(true);
      }
    };

    fetchUserData();
  }, [currentUser, triggerSignout]);

  useEffect(() => {
    toggleTheme();
  }, []);

  useEffect(() => {
    if (
      currentURL === "/login" ||
      currentURL === "/forgot-password" ||
      currentURL === "/reset-password"
    ) {
      setValidPath(false);
    } else {
      setValidPath(true);
    }
  }, [currentURL]);

  return (
    validUser &&
    validPath && (
      <div className={`app`}>
        <SideNav
          updateTitle={updateTitle}
          pageTitle={pageTitle}
          handleSignOut={handleSignOut}
        />
        <TopNav
          theme={currentNavTheme}
          toggleTheme={toggleTheme}
          avatar={avatar}
          pageTitle={pageTitle}
        />
      </div>
    )
  );
}
