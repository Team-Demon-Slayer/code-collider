"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegisterModal from "./RegisterModal";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Please enter a valid password. Password must be at least 8 characters long.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log(data);
      router.push('/');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowRegisterModal(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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
            onClick={handleRegister}
          >
            Sign Up
          </button>
          <Link href="/forgot-password"> Forgot Password</Link>
        </form>
      </div>
      {showRegisterModal && <RegisterModal setShowRegisterModal={setShowRegisterModal} showRegisterModal={showRegisterModal} email={email} password={password} />}
    </div>
  );
}

