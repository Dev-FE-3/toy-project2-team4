"use client";

import { useState } from "react";
import style from "./page.module.scss";
import LoginForm from "../../components/login/loginForm/loginForm";
import SignupForm from "../../components/login/signupForm/signupForm";
import { auth } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authReducer";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인/회원가입 토글
  const [isManager, setIsManager] = useState(false); // 관리자인지 강사님인지 확인

  const dispatch = useDispatch();
  // 리덕스로 관리하는 상태 값 가져오기 (로그인 유저 정보 : 이름 , email , role)
  const userInfo = useSelector((state) => state.auth.user);

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
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className={style.container}>
      <h1>
        {userInfo?.name}
        {userInfo?.email}
        {userInfo?.role}
      </h1>
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
