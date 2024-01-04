"use client";
import React, { useState, useEffect } from "react";
import SideNav from "./sideNav/SideNav.jsx";
import TopNav from "./topNav/TopNav.jsx";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import supabase from "../../api/_db/index.js";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function Nav() {
  const [avatar, setAvatar] = useState("");
  const [currentNavTheme, setCurrentNavTheme] = useState("light");
  const [pageTitle, setPageTitle] = useState("HOME PAGE");
  const [validUser, setValidUser] = useState(false);
  const [triggerSignout, setTriggerSignout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") setCurrentUser(session.user.email);
    });
  }, [supabaseClient, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
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

        /* if (profile) {
          setAvatar("");
        } */
        setValidUser(true);
      }
    };

    fetchUserData();
  }, [currentUser, triggerSignout]);

  useEffect(() => {
    toggleTheme();
  }, []);

  return (
    validUser && (
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
