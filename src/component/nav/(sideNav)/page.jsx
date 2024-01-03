import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from './supabaseClient'; 

const SideNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const user = supabase.auth.user();
      setLoggedIn(!!user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Additional logic after sign out
  };

  const titles = loggedIn
    ? ['HOME PAGE', 'MY PROJECTS', 'PROJECT PAGE', 'COMMUNITY SHOWCASE', 'SIGN OUT']
    : ['HOME PAGE', 'CREATE A PROJECT', 'BROWSE PROJECTS'];

  return (
    <aside className="side-nav">
      <div className="logo">
        <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
      </div>
      <nav>
        {titles.map((title, index) => (
          <Link key={index} href={`/${title.replace(/ /g, '-').toLowerCase()}`}>
            <a className="nav-link">{title}</a>
          </Link>
        ))}
      </nav>
      {loggedIn && <button className="sign-out" onClick={handleSignOut}>SIGN OUT</button>}
    </aside>
  );
};

export default SideNav;