"use client";

import { useState } from "react";
import style from "./page.module.scss";
import LoginForm from "../../components/login/loginForm/loginForm";
import SignupForm from "../../components/login/signupForm/signupForm";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const changeManager = () => {
    if (isManager) {
      setIsManager(false);
    } else {
      setIsManager(true);
    }
  };

  const changeSigup = () => {
    if (isSignUp) {
      setIsSignUp(false);
    } else {
      setIsSignUp(true);
    }
  };

  return (
    <main className={style.contaier}>
      {isSignUp ? (
        <SignupForm changeSingUp={changeSigup} changeManager={changeManager} isManager={isManager} />
      ) : (
        <LoginForm changeSingUp={changeSigup} changeManager={changeManager} isManager={isManager} />
      )}
    </main>
  );
}
