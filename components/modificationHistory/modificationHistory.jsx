"use client";
import styles from "./modificationHistory.module.scss";
import Icon from "../common/icon/icon";
import Modal from "../common/modal/modal";
import { useState } from "react";
import ModificationList from "../modificationList/modificationList";  // 추가된 부분

const datas = [
  {
    num: 1,
    email: "test@test.com",
    registeredDate: "2025.02.20",
    reasonForRequest: "업무 연장",
    content: "추가 수업한 부분에 대해서 정정을 신청하겠습니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 2,
    email: "test@test.com",
    registeredDate: "2024.12.15",
    reasonForRequest: "오류 수정",
    content: "출석 시간 오류로 인해 정정을 요청합니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 3,
    email: "test@test.com",
    registeredDate: "2024.11.30",
    reasonForRequest: "업무 연장",
    content: "추가 업무가 발생하여 정정 요청합니다.",
    requestStatus: "정정 완료",
    isClickable: false,
  },
  {
    num: 4,
    email: "test@test.com",
    registeredDate: "2025.02.20",
    reasonForRequest: "업무 연장",
    content: "추가 수업한 부분에 대해서 정정을 신청하겠습니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 5,
    email: "test@test.com",
    registeredDate: "2024.12.15",
    reasonForRequest: "오류 수정",
    content: "출석 시간 오류로 인해 정정을 요청합니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 6,
    email: "test@test.com",
    registeredDate: "2024.11.30",
    reasonForRequest: "업무 연장",
    content: "추가 업무가 발생하여 정정 요청합니다.",
    requestStatus: "정정 완료",
    isClickable: false,
  },
  {
    num: 7,
    email: "test@test.com",
    registeredDate: "2025.02.20",
    reasonForRequest: "업무 연장",
    content: "추가 수업한 부분에 대해서 정정을 신청하겠습니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 8,
    email: "test@test.com",
    registeredDate: "2024.12.15",
    reasonForRequest: "오류 수정",
    content: "출석 시간 오류로 인해 정정을 요청합니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 9,
    email: "test@test.com",
    registeredDate: "2024.12.15",
    reasonForRequest: "오류 수정",
    content: "출석 시간 오류로 인해 정정을 요청합니다.",
    requestStatus: "대기",
    isClickable: true,
  },
  {
    num: 10,
    email: "test@test.com",
    registeredDate: "2024.12.15",
    reasonForRequest: "오류 수정",
    content: "출석 시간 오류로 인해 정정을 요청합니다.",
    requestStatus: "대기",
    isClickable: true,
  },
];

const ModificationHistory = () => {
  const [listDatas, setListDatas] = useState([...datas]);
  const [isModal, setIsModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const sortedDatas = [...listDatas].sort((a, b) => new Date(b.registeredDate) - new Date(a.registeredDate));
  const totalCount = sortedDatas.length;

  const handleModal = (sortedData) => {
    setSelectedList(sortedData);
    setIsModal(true);
  };

  const handleListDelete = (selectedList) => {
    if (selectedList.num) {
      const updatedList = listDatas.filter((listData) => listData.num !== selectedList.num);
      setListDatas(updatedList);

      setIsModal(false);
      setSelectedList(null);
    }
  };

  return (
    <main className={styles.container}>
      <p className={styles.totalCount}>
        총 <strong>{listDatas.length}</strong> 개
      </p>
      <div className={styles.listWapper}>
        <li className={styles.listTitle}>
          <div>번호</div>
          <div>날짜</div>
          <div>사유</div>
          <div>내용</div>
          <div>상태</div>
          <div>취소</div>
        </li>

        <ModificationList
          listDatas={listDatas}
          sortedDatas={sortedDatas}
          totalCount={totalCount}
          handleModal={handleModal}
        />
      </div>

      {isModal && (
        <Modal
          onCheck={() => handleListDelete(selectedList)}
          onCancel={() => setIsModal(!isModal)}
          title="주의"
          titleIcon={<Icon style="rounded" iconname="warning" size="2rem" color="#d86060" />}
          checkButtonColor="red"
          showCancelButton={true}
        >
          <p>
            삭제 시 복구가 어렵습니다.
            <br />
            아래 내용을 삭제 하시려면 확인을 눌러주세요.
            <br />
            사유: {selectedList?.reasonForRequest}
            <br />
            내용: {selectedList?.content}
          </p>
        </Modal>
      )}
    </main>
  );
};

export default ModificationHistory;
