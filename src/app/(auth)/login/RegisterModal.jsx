"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";
import "../../globals.css";
import "./RegisterModal.css";

const RegisterModal = ({
  showRegisterModal,
  setShowRegisterModal,
  email,
  password,
}) => {
  const [experienceLevel, setExperienceLevel] = useState("");
  const [reasonForJoining, setReasonForJoining] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const router = useRouter();

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

  const handleExperienceLevelChange = (event) => {
    setExperienceLevel(event.target.value);
  };

  const handleReasonForJoiningChange = (event) => {
    setReasonForJoining(event.target.value);
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

  const handleModalOverlayClick = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const handleRegister = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      const user = data.user;
      if (error) throw error;

      const { data: userData, error: userInsertError } = await supabase
        .from("users")
        .insert([
          {
            id: user.id,
            username: email.split('@')[0],
            email: email,
            experience: experienceLevel,
            reason_for_joining: reasonForJoining,
            profile_photo: "https://ujxeijwxbsrjfzqemtaq.supabase.co/storage/v1/object/public/Profile/code-collider-logo.png",
            ...(reasonForJoining === "Mentoring" && { is_mentor: true }),
          }
        ]);

      if (userInsertError) throw userInsertError;

      const { data: languageData, error: languageError } = await supabase
        .from("languages")
        .select("id, name")
        .in("name", selectedLanguages);

      if (languageError) throw languageError;

      const userLanguages = languageData.map((language) => ({
        user_id: user.id,
        language_id: language.id,
      }));

      const { error: userLanguagesError } = await supabase
        .from("users_languages")
        .insert(userLanguages);

      if (userLanguagesError) throw userLanguagesError;

      alert("Check your email for verification.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleModalOverlayClick}>
      <div
        className="register-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="register-modal__title">Tell us about yourself</h1>
        <div className="register-modal__dropdown">
          <label>
            Experience Level
            <br />
            <select
              className="register-modal-select"
              value={experienceLevel}
              onChange={handleExperienceLevelChange}
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
          <br />
          <label>
            Reason for Joining
            <br />
            <select
              className="register-modal-select"
              value={reasonForJoining}
              onChange={handleReasonForJoiningChange}
            >
              <option value="">Select</option>
              <option value="Learning">Learning</option>
              <option value="Career Change">Career Change</option>
              <option value="Personal Interest">Personal Interest</option>
              <option value="Mentoring">Mentoring</option>
            </select>
          </label>
        </div>
        <br />
        <div>
          <h3>Coding Languages</h3>
          <div className="languages-grid">
            {codingLanguages.map((language) => (
              <label
                key={language}
                className={`language-label ${selectedLanguages.includes(language) ? "selected" : ""
                  }`}
                onClick={() => handleLanguageSelection(language)}
              >
                {language}
              </label>
            ))}
          </div>
        </div>
        <button className="register-modal__button" onClick={handleRegister}>
          Register
        </button>
        <br />
        <a onClick={() => setShowRegisterModal(!showRegisterModal)}>
          Already have an account? Log in
        </a>
      </div>
    </div>
  );
};

export default RegisterModal;
