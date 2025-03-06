import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import Input from "../../../components/common/input/input";
import Button from "../../../components/common/button/button";
import style from "../style/loginForm.module.scss";

const LoginForm = ({ changeSingUp, changeManager, isManager }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //로그인 유저 정책을 '브라우져 세션'으로 설정
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user.displayName;

      const jsonUser = JSON.parse(user);
      jsonUser.email = userCredential.user.email;

      if (!user || isManager !== (jsonUser.role === "admin")) {
        alert("아이디와 비밀번호를 확인해 주세요.");
        return;
      }

      const firebaseAuth = JSON.stringify(jsonUser);
      sessionStorage.setItem("firebaseAuth", firebaseAuth);

      console.log("로그인성공");
      window.location.href = "/"; // 로그인 성공 시 홈으로 리다이렉트
    } catch (err) {
      console.log("로그인에 실패했습니다.", err);
      alert("아이디와 비밀번호를 확인해 주세요.");
    }
  };

  const handleRoleChange = () => {
    changeManager();
    setEmail("");
    setPassword("");
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>그랑코딩학원</h1>

      <div className={style.changeuserbtn}>
        <Button
          type="button"
          onClick={handleRoleChange}
          style={isManager ? {} : { backgroundColor: "white", boxShadow: "1px 2px 0px 0px rgba(0, 0, 0, 0.25)" }}
        >
          강사님
        </Button>
        <Button
          type="button"
          onClick={handleRoleChange}
          style={isManager ? { backgroundColor: "white", boxShadow: "1px 2px 0px 0px rgba(0, 0, 0, 0.25)" } : {}}
        >
          관리자
        </Button>
      </div>

      <form className={style.form} onSubmit={handleLogin} key={isManager ? "manager" : "user"}>
        <div className={style.items}>
          <h3>이메일</h3>
          <Input type="email" defaultValue={email} placeholder="이메일" onChange={setEmail} />
        </div>

        <div className={style.items}>
          <h3>비밀번호</h3>
          <Input type="password" defaultValue={password} placeholder="비밀번호" onChange={setPassword} />
        </div>

        <div className={style.items}>
          <Button type="submit">로그인</Button>
          <Button type="button" onClick={changeSingUp}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
