"use client";
import React, { useState } from 'react';
import '../../globals.css';
import './RegisterModal.css';

const RegisterModal = ({ showRegisterModal, setShowRegisterModal }) => {
  const [experienceLevel, setExperienceLevel] = useState('');
  const [reasonForJoining, setReasonForJoining] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleExperienceLevelChange = (event) => {
    setExperienceLevel(event.target.value);
  };

  const handleReasonForJoiningChange = (event) => {
    setReasonForJoining(event.target.value);
  };

  const handleLanguageSelection = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleRegister = () => {
    // Handle registration logic here
  };

  const handleModalOverlayClick = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  return (
    <div className="register-modal-overlay" onClick={handleModalOverlayClick}>
      <div className="register-modal">
        <h1 className="register-modal__title">Tell us about yourself</h1>
        <label className="">
          Experience Level:
          <select value={experienceLevel} onChange={handleExperienceLevelChange}>
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        <br />
        <label>
          Reason for Joining:
          <select value={reasonForJoining} onChange={handleReasonForJoiningChange}>
            <option value="">Select</option>
            <option value="Learning">Learning</option>
            <option value="Career Change">Career Change</option>
            <option value="Personal Interest">Personal Interest</option>
          </select>
        </label>
        <br />
        <div>
          Coding Languages:
          <label>
            <input
              type="checkbox"
              checked={selectedLanguages.includes('JavaScript')}
              onChange={() => handleLanguageSelection('JavaScript')}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLanguages.includes('Python')}
              onChange={() => handleLanguageSelection('Python')}
            />
            Python
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLanguages.includes('Java')}
              onChange={() => handleLanguageSelection('Java')}
            />
            Java
          </label>
          {/* Add more coding languages here */}
        </div>
        <br />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterModal;
