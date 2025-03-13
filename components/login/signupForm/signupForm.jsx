import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import Input from "../../common/input/input";
import Button from "../../common/button/button";
import style from "../loginPageForm.module.scss";
import Modal from "../../common/modal/modal";
import Icon from "../../common/icon/icon";

const SignupForm = ({ changeSingUp, changeManager, isManager }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");

  const [successSignUp, setSuccessSignUp] = useState(false);

  const [errorSignUpModal, setErrorSignUpModal] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState("");

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // firebase 이메일 형식 검사
    const passwordRegex = /^.{6,16}$/; // 6자 이상 16자 이하
    const userNameRegex = /^.{3,10}$/; // 3자 이상 10자 이하
    const businessRegistrationNumberRegex = /^\d{10}$/; //숫자 10자리

    // 유효성 검사
    if (!emailRegex.test(email) || email === "") {
      setErrorSignUp("유효한 이메일을 입력해주세요.");
      setErrorSignUpModal(true);
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorSignUp("비밀번호는 6자에서 최대 16자까지 가능합니다.");
      setErrorSignUpModal(true);
      return;
    }

    if (!userNameRegex.test(userName)) {
      setErrorSignUp("이름은 3자에서 최대 10자까지 가능합니다.");
      setErrorSignUpModal(true);
      return;
    }

    if (isManager && !businessRegistrationNumberRegex.test(businessRegistrationNumber)) {
      setErrorSignUp("유효한 사업자등록번호를 입력해 주세요.");
      setErrorSignUpModal(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userInfo = { name: userName, role: isManager ? "admin" : "user" };

      await updateProfile(user, {
        displayName: JSON.stringify(userInfo),
      });

      setSuccessSignUp(true);
    } catch (err) {
      console.log("회원가입에 실패했습니다.");
      console.log(err);
    }
  };

  const handleUserButton = () => {
    if (isManager) {
      changeManager();
      setEmail("");
      setPassword("");
    }
  };

  const handleAdminButton = () => {
    if (!isManager) {
      changeManager();
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={style.container}>
      {/* <h1 className={style.title}>그랑코딩학원</h1> */}
      <h1 className={style.title}>
        <img src="/images/title-logo.svg" alt="" />
      </h1>

      <div className={style.changeuserbtn}>
        <div className={`${style.roleFocus} ${isManager ? style.adminFocus : style.userFocus}`}></div>
        <div className={`${style.roleButton} ${isManager ? {} : style.selected}`} onClick={handleUserButton}>
          강사님
        </div>
        <div className={`${style.roleButton} ${isManager ? style.selected : {}}`} onClick={handleAdminButton}>
          관리자
        </div>
      </div>

      <form className={style.form} onSubmit={handleSignup} key={isManager ? "manager" : "user"}>
        <div className={style.items}>
          <label>이메일</label>
          <Input type="email" defaultValue={email} placeholder="이메일" onChange={setEmail} />
        </div>

        <div className={style.items}>
          <label>비밀번호</label>
          <Input type="password" defaultValue={password} placeholder="비밀번호" onChange={setPassword} />
        </div>

        <div className={style.items}>
          <label>이름</label>
          <Input type="text" defaultValue={userName} placeholder="이름" onChange={setUserName} />
        </div>
        {isManager ? (
          <div className={style.items}>
            <label>사업자 등록번호</label>
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
          <Button type="submit" className={style.button}>
            회원가입
          </Button>
        </div>

        <div className={style.items}>
          <Button type="button" onClick={changeSingUp} className={`${style.signButton} ${style.button}`}>
            로그인하러 가기
          </Button>
        </div>
      </form>

      <div className={`${style.modalItem} ${successSignUp ? "" : style.modalItemNone}`}>
        <Modal
          title="성공"
          titleIcon={<Icon style="rounded" iconname="check" color="#3199fe" />}
          onCheck={() => {
            changeSingUp();
          }}
        >
          회원가입에 성공했습니다!
        </Modal>
      </div>

      <div className={`${style.modalItem} ${errorSignUpModal ? "" : style.modalItemNone}`}>
        <Modal
          title="안내"
          titleIcon={<Icon style="rounded" iconname="info" color="#cc3838" />}
          onCheck={() => {
            setErrorSignUpModal(false);
          }}
        >
          {errorSignUp}
        </Modal>
      </div>
    </div>
  );
};

export default SignupForm;
