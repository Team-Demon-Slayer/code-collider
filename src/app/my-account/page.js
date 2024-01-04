"use client";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, useEffect } from "react";
import Profile from "./_components/Profile.jsx";
import Languages from "./_components/Languages.jsx";
import Experience from "./_components/Experience.jsx";
import Bio from "./_components/Bio.jsx";

const supabase = createClientComponentClient();

export default function Account() {
  const [user, setUser] = useState(null);
  const userData = {
    username: "John Doe",
    experience: "Intermediate",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu ac tortor dignissim convallis aenean et tortor. Ut diam quam nulla porttitor massa id. Sed blandit libero volutpat sed cras ornare arcu. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Ipsum consequat nisl vel pretium lectus quam id leo. At risus viverra adipiscing at in tellus integer feugiat.",
    profile_photo: "https://i.imgur.com/6VBx3io.jpg",
    is_mentor: true,
  };
  const handleUser = (user) => {
    setUser(user);
  };
  useEffect(() => {
    setUser(userData);
      }, []);
  return user ? (
  <main className="account-page">
    <div className="main-container">
      <div className="column1">
        <Profile user= {user}/>
      </div>
      <div className="column2">
        <Languages user= {user}/>
        <Experience user= {user}/>
      </div>
    </div>
    <div className= "bio-container">
      <Bio user= {user}/>
    </div>
  </main>) : <div>loading</div>;
}
