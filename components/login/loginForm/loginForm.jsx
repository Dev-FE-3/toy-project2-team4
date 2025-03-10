import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import Input from "../../common/input/input";
import Button from "../../common/button/button";
import style from "../loginForm/loginForm.module.scss";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/reducers/authReducer";

const LoginForm = ({ changeSingUp, changeManager, isManager }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //로그인 유저 정책을 '브라우져 세션'으로 설정
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 유저 정보 확인
      if (!user.displayName) throw new Error("유저 정보가 없습니다.");

      const userInfo = JSON.parse(user.displayName);
      userInfo.email = user.email;

      if (!user || isManager !== (userInfo.role === "admin")) {
        alert("아이디와 비밀번호를 확인해 주세요.");
        return;
      }
      console.log(userInfo);
      // redux 상태 업데이트
      dispatch(loginSuccess(userInfo));

      console.log("로그인성공");

      // window.location.href = "/"; // 로그인 성공 시 홈으로 리다이렉트
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
        <Button type="button" onClick={handleRoleChange} style={isManager ? {} : { backgroundColor: "white" }}>
          강사님
        </Button>
        <Button type="button" onClick={handleRoleChange} style={isManager ? { backgroundColor: "white" } : {}}>
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
        </div>
        <div className={style.items}>
          <Button type="button" onClick={changeSingUp}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
