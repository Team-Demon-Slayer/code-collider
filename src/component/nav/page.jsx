'use Client';
import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

const Nav = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}-mode`}>
      <SideNav />
      <TopNav theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Nav;