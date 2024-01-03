'use client';
import React, { useState, useEffect} from 'react';
import SideNav from './sideNav/SideNav.jsx';
import TopNav from './topNav/TopNav.jsx';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import supabase from '../../api/_db/index.js';
import { useRouter } from 'next/navigation';
import '../../globals.css';
export default function Nav () {
  const [avatar, setAvatar] = useState('');
  const [currentNavTheme, setCurrentNavTheme] = useState('light');
  const [pageTitle, setPageTitle] = useState('HOME PAGE'); 
  const router = useRouter();
  const supabaseClient = createClientComponentClient();
  const [validUser, setValidUser] = useState(false);
  function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    setCurrentNavTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
  const updateTitle = (newTitle) => {
    setPageTitle(newTitle);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error || !data) {
        router.push('/login');
        return;
      }
      console.log(data);
      if (data.session.user) {
        const { data: profile } = await supabaseClient
          .from('users')
          .select('profile_photo')
          .eq('email', data.session.user.email)
          .single();

        if (profile) {
          setAvatar('');
          // setNewMessage(profile.has_new_message);
        }
        setValidUser(true);
      }
    };

    fetchUserData();
  }, [ supabase ]);
  // useEffect(() => {
  //   // console.log('Current theme:', theme);
  // }, [currentNavTheme]);
  return validUser && (
    <div className={`app ${currentNavTheme}-mode`} data-theme={currentNavTheme}>
      <SideNav updateTitle={updateTitle} />
      <TopNav theme={currentNavTheme} toggleTheme={toggleTheme} avatar={avatar} pageTitle={pageTitle} />
    </div>
  );
};

