import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { supabase } from './supabaseClient'; 
import Image from 'next/image';
const TopNav = ({ theme, toggleTheme }) => {
  const [newMessage, setNewMessage] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = supabase.auth.user();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url, has_new_message')
          .eq('id', user.id)
          .single();

        if (profile) {
          setAvatar(profile.avatar_url);
          setNewMessage(profile.has_new_message);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className={`top-nav ${theme}-mode`}>
      <h1 className="page-title">Page Title</h1>
      <div className="theme-switcher">
        <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>
      <div className="user-info">
        {avatar && <Image src={avatar} alt="Avatar" className="avatar" />}
        {newMessage && <div className="new-message"></div>}
      </div>
    </header>
  );
};

export default TopNav;