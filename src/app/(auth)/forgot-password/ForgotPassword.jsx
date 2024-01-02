"use client";
import React, { useState } from "react";
import { supabase } from "../supabase";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'http://localhost:3000/reset-password' });
    } catch (error) {
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container">
      <h1>CODE <br /> COLLIDER </h1>
      <h2>Collide. Collab. Create.</h2>
      <div className="login-container">
        <h1 className="login-header">Password Reset</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <input
              type="email"
              placeholder="Type your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <button className="login-button" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

