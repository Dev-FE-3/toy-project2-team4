import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import Input from "../../../components/common/input/input";
import Button from "../../../components/common/button/button";
import style from "../style/signupForm.module.scss";

const SignupForm = ({ changeSingUp, changeManager, isManager }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // firebase 이메일 형식 검사
    const passwordRegex = /^.{6,16}$/; // 6자 이상 16자 이하
    const userNameRegex = /^.{3,10}$/; // 3자 이상 10자 이하
    const businessRegistrationNumberRegex = /^\d{10}$/; //숫자 10자리

    // 유효성 검사

    if (!emailRegex.test(email) || email === "") {
      alert("유효한 이메일을 입력하세요.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("비밀번호는 6자에서 최대 16자까지 가능합니다.");
      return;
    }

    if (!userNameRegex.test(userName)) {
      alert("이름은 3자에서 최대 10자까지 가능합니다.");
      return;
    }

    if (!businessRegistrationNumberRegex.test(businessRegistrationNumber)) {
      alert("유효한 사업자등록번호를 입력해 주세요.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userInfo = { name: userName, role: isManager ? "admin" : "user" };

      await updateProfile(user, {
        displayName: JSON.stringify(userInfo),
      });

      console.log("회원가입에 성공했습니다!");
      changeSingUp();
      // window.location.href = "/"; // 회원가입 후 홈으로 리다이렉트
    } catch (err) {
      console.log("회원가입에 실패했습니다.");
      console.log(err);
    }
  };

  const handleRoleChange = () => {
    changeManager();
    setEmail("");
    setPassword("");
    setUserName("");
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

      <form className={style.form} onSubmit={handleSignup} key={isManager ? "manager" : "user"}>
        <div className={style.items}>
          <h3>이메일</h3>
          <Input type="email" defaultValue={email} placeholder="이메일" onChange={setEmail} />
        </div>

        <div className={style.items}>
          <h3>비밀번호</h3>
          <Input type="password" defaultValue={password} placeholder="비밀번호" onChange={setPassword} />
        </div>

        <div className={style.items}>
          <h3>이름</h3>
          <Input type="text" defaultValue={userName} placeholder="이름" onChange={setUserName} />
        </div>
        {isManager ? (
          <div className={style.items}>
            <h3>사업자 등록번호</h3>
            <Input
              type="text"
              defaultValue={businessRegistrationNumber}
              placeholder="사업자등록번호"
              required
              onChange={setBusinessRegistrationNumber}
            />
          </div>
        ) : (
          ""
        )}

        <div className={style.items}>
          <Button type="submit">회원가입</Button>
          <Button type="button" onClick={changeSingUp}>
            로그인하러가기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
