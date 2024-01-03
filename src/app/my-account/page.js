"use client";
import "./styles.css";
import Profile from "./_components/Profile.jsx";
import Languages from "./_components/Languages.jsx";
import Experience from "./_components/Experience.jsx";
import Bio from "./_components/Bio.jsx";
export default function Account() {
  return <main>
    <div className="main-container">
      <div className="column1">
        <Profile />
      </div>
      <div className="column2">
        <Languages />
        <Experience />
      </div>
    </div>
    <div className= "bio-container">
      <Bio/>
    </div>
  </main>;
}
