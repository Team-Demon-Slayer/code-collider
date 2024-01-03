"use client";
import React, { useState } from "react";
import { supabase } from "../supabase";
import Link from "next/link";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await supabase.auth.updateUser({
        password: password
      });
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  return (
    <div className="container">
      <h1>CODE <br /> COLLIDER </h1>
      <h2>Collide. Collab. Create.</h2>
      <div className="login-container">
        <h1 className="login-header">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button
            className="login-button"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}