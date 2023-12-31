"use client";
import "../page.css";
import supabase from "../../api/_db/index.js";
import React, { useState, useEffect } from "react";
export default function Languages({ user, languages }) {
  const [modalState, setModalState] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(languages);
  const codingLanguages = [
    "JavaScript",
    "C#",
    "Python",
    "Java",
    "Go",
    "Kotlin",
    "Swift",
    "C++",
    "HTML",
    "CSS",
    "Ruby",
    "Rust",
    "TypeScript",
    "Bash",
    "Assembly",
    "Visual Basic",
  ];
  const handleModal = () => {
    setModalState(!modalState);
  };
  const handleLanguageSelection = (language) => {
    setSelectedLanguages((prevSelectedLanguages) => {
      if (prevSelectedLanguages.includes(language)) {
        return prevSelectedLanguages.filter((lang) => lang !== language);
      } else {
        return [...prevSelectedLanguages, language];
      }
    });
  };
  return (
    <main>
      <div className="languages-info">
        <div className="languages-header">Languages</div>
        <div className="languages-grid">
          {codingLanguages.map((language) => (
            <label
              key={language}
              className={`language-label ${
                selectedLanguages.includes(language) ? "selected" : ""
              }`}
              onClick={() => handleLanguageSelection(language)}
            >
              {language}
            </label>
          ))}
        </div>
      </div>
    </main>
  );
}
