"use client";

import { useState } from "react";
import { auth } from "../../utils/firebase"; // Firebase 초기화 import
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import style from "./page.module.scss";
import Input from "../../components/common/input/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false); // 로그인/회원가입 토글

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // await console.log(signInWithEmailAndPassword(auth, email, password));
      console.log("로그인에 성공했습니다!");
      window.location.href = "/"; // 로그인 성공 시 홈으로 리다이렉트
    } catch (err) {
      setError("로그인에 실패했습니다.");
    }
  };

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("회원가입에 성공했습니다!");
      setIsSignup(false);
      // window.location.href = "/"; // 회원가입 후 홈으로 리다이렉트
    } catch (err) {
      setError("회원가입에 실패했습니다.");
    }
  };

  const resetIput = () => {};

  const logOut = () => {
    auth.signOut();
  };

  return (
    <div className={style.container}>
      <header>
        <h1>{isSignup ? "회원가입" : "로그인"}</h1>
      </header>
      <main>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <Input type="email" defaultValue={email} placeholder="Email" onChange={setEmail} />
          {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /> */}
          <Input type="password" defaultValue={password} placeholder="Password" onChange={setPassword} />
          {/* <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          /> */}
          <button type="submit" onClick={resetIput}>
            {isSignup ? "회원가입" : "로그인"}
          </button>
        </form>
        {error && error}
      </main>

      <footer>
        <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? "로그인 하기" : "회원가입 하기"}</button>
      </footer>

      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}
