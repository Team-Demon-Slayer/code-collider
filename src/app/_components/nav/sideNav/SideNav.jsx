
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../nav.css';
import supabase from '../../../api/_db/index.js';
import {useRouter} from 'next/navigation';
// import { supabase } from './supabaseClient'; 
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const SideNav = ( {updateTitle} ) => {
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const titles = ['HOME PAGE', 'MY PROJECTS', 'PROJECT PAGE', 'COMMUNITY SHOWCASE']

  return (
    <aside className="side-nav">
      <div className="logo">
        <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
      </div>
      <nav>
        {titles.map((title, index) => (
          <Link key={index} href={`/${title.replace(/ /g, '-').toLowerCase()}`}>  
           <div className="nav-link" onClick={() => handleLinkClick(title)}>{title}</div>
          </Link>
        ))}
      </nav>
      <button className="sign-out" onClick={handleSignOut}>SIGN OUT</button>
    </aside>
  );
};

export default SideNav;