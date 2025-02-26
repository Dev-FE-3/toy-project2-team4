"use client";

import { useState } from "react";
import Modal from "../../components/common/modal/modal";
import Icon from "../../components/common/icon/icon.jsx";
const Login = () => {
  const [isModal, setIsModal] = useState(false);

  // 모달창 사용 예시 함수
  const onClickModal = () => {
    if (isModal) {
      setIsModal(false);
    } else {
      setIsModal(true);
    }
    console.log(isModal);
  };

  return (
    <div>
      로그인 페이지
      <button onClick={onClickModal}>모달창 on</button>
      {isModal ? (
        <Modal
          onCheck={onClickModal}
          onCancel={onClickModal}
          title="주의"
          titleIcon={<Icon iconname="warning" size="2rem" color="#D86060"></Icon>}
          showCancelButton={true}
        >
          <p> 홍길동님의 로그인 정보는 아래와 같습니다. </p>
          <p> 아이디 : 2501001 </p>
          <p> 초기 비밀번호 : 041212 </p>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
