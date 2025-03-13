import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/reducers/authReducer";
import { useRouter } from "next/navigation";
import Button from "../../common/button/button";
import Input from "../../common/input/input";
import style from "../loginPageForm.module.scss";
import Modal from "../../common/modal/modal";
import Icon from "../../common/icon/icon";

const LoginForm = ({ changeSingUp, changeManager, isManager }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [failedLogin, setFailedLogin] = useState(true);

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //로그인 유저 정책을 '브라우져 세션'으로 설정
      // await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 유저 정보 확인
      if (!user.displayName) throw new Error("유저 정보가 없습니다.");

      const userInfo = JSON.parse(user.displayName);
      userInfo.email = user.email;

      // 유저 확인 (관리자 or 강사님)
      if (!user || isManager !== (userInfo.role === "admin")) {
        console.log("user role : ", userInfo.role);
        setFailedLogin(false);
        return;
      }
      console.log(userInfo);

      // 로컬 스토리지에
      // localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // redux 상태 업데이트
      dispatch(loginSuccess(userInfo));

      router.replace("/"); // 로그인 성공 시 홈으로 리다이렉트(새로고침 없이)
    } catch (err) {
      console.log("로그인에 실패했습니다.", err);
      setFailedLogin(false);
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

      <form className={style.form} onSubmit={handleLogin} key={isManager ? "manager" : "user"}>
        <div className={style.items}>
          <label>이메일</label>
          <Input type="email" defaultValue={email} placeholder="이메일" onChange={setEmail} />
        </div>

        <div className={style.items}>
          <label>비밀번호</label>
          <Input type="password" defaultValue={password} placeholder="비밀번호" onChange={setPassword} />
        </div>

        <div className={style.items}>
          <Button type="submit" className={style.button}>
            로그인
          </Button>
        </div>

        <div className={style.items}>
          <Button type="button" onClick={changeSingUp} className={`${style.signButton} ${style.button}`}>
            회원가입
          </Button>
        </div>
      </form>

      <div className={`${style.modalItem} ${failedLogin ? style.modalItemNone : ""}`}>
        <Modal
          title="안내"
          titleIcon={<Icon style="rounded" iconname="info" color="#cc3838" />}
          checkButtonColor="red"
          onCheck={() => {
            setFailedLogin(!failedLogin);
          }}
        >
          아이디와 비밀번호를 확인해 주세요.
        </Modal>
      </div>
    </div>
  );
};

export default LoginForm;
