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
      <Icon iconname="home" size="2rem" color="red"></Icon>
      {/* calss 추가하기 */}
      {isModal ? (
        <Modal
          onCheck={onClickModal}
          onCancel={onClickModal}
          title="주의!"
          titleIcon={<Icon style="rounded" iconname="warning" size="2rem" color="#d86060"></Icon>}
          checkButtonColor="red"
          showCancelButton={true}
        >
          <p> 정말 삭제 하시겠습니까? </p>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
