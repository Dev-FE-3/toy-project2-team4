"use client";

import { useState } from "react";
import style from "./page.module.scss";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import { auth } from "../../utils/firebase";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인/회원가입 토글
  const [isManager, setIsManager] = useState(false); // 관리자인지 강사님인지 확인

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

  const logOut = () => {
    auth.signOut();
    sessionStorage.removeItem("firebaseAuth");
  };

  return (
    <div className={style.container}>
      <aside className={style.left}>
        <img src="/assets/loginimg.png" />
        <button onClick={logOut}>로그아웃</button>
      </aside>
      <main className={style.right}>
        <article className={style.article}>
          {isSignUp ? (
            <SignupForm changeSingUp={changeSigup} changeManager={changeManager} isManager={isManager} />
          ) : (
            <LoginForm changeSingUp={changeSigup} changeManager={changeManager} isManager={isManager} />
          )}
        </article>
      </main>
    </div>
  );
}
