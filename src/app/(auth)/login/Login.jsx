"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegisterModal from "./RegisterModal";
import { supabase } from "../supabase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

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
      alert("Please enter a valid password. Password must be at least 8 characters long, have one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?&).");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Please enter a valid password. Password must be at least 8 characters long, have one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?&).");
      return;
    }
    setShowRegisterModal(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const userExists = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(error);
      return false;
    }

    return data !== null;
  };

  const handleGoogleLogin = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert(error.message);
    } else if (user && !(await userExists(user.id))) {
      router.push("/login");
      setShowRegisterModal(true);
    } else {
      router.push("/");
    }
  };

  const handleGithubLogin = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      alert(error.message);
    } else if (user && !(await userExists(user.id))) {
      router.push("/login");
      setShowRegisterModal(true);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container">
      <h1>
        <img className="logo" src="/logo.png" alt="Logo" />
        {/* {" "} ODE <br /> COLLIDER{" "} */}
      </h1>
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
          <Link className="forgot-password" href="/forgot-password"> Forgot Password</Link>
        </form>
        <div className="other-login-container">
          <h3 className="other-login-text">or login with</h3>
          <div className="other-login-buttons">
            <div className="google-login">
              <FontAwesomeIcon icon={faGoogle} onClick={handleGoogleLogin} />
            </div>
            <div className="github-login">
              <FontAwesomeIcon icon={faGithub} onClick={handleGithubLogin} />
            </div>
          </div>
        </div>
      </div>
      {showRegisterModal && (
        <RegisterModal
          setShowRegisterModal={setShowRegisterModal}
          showRegisterModal={showRegisterModal}
          email={email}
          password={password}
        />
      )}
      <h2>Collide. Collab. Create.</h2>
    </div>
  );
}
