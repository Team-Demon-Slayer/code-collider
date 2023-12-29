"use client";
import React, { useState } from "react";
import Link from "next/link";
import RegisterModal from "./RegisterModal";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Perform sign in logic here
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowRegisterModal(true);
  };

  return (
    <div className="container">
      <h1>CODE <br /> COLLIDER </h1>
      <h2>Collide. Collab. Create.</h2>
      <div className="login-container">
        <h1 className="login-header">Login</h1>
        <form>
          <div className="login-fields">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className="login-button"
            type="submit"
            disabled={!email || !password}
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="register-button"
            disabled={!email || !password}
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <a href="#">Forgot Password</a>
        </form>
      </div>
      {showRegisterModal && <RegisterModal setShowRegisterModal={setShowRegisterModal} showRegisterModal={showRegisterModal} />}
    </div>
  );
}

