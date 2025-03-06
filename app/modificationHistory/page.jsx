"use client";

import Button from "../../components/common/button/button";
import styles from "./modificationHistory.module.scss";
import Modal from "../../components/common/modal/modal";
import Icon from "../../components/common/icon/icon";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  const count = useSelector((state) => state.value); // Redux 상태(값을 가져오고 사용)
  const dispatch = useDispatch(); // (값을 변경시킬려고 사용)

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

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
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
        <ul className={styles.listContent}>
          {listDatas.length === 0 ? (
            <li className={styles.noData}>
              <div>정정 신청 내역이 없습니다.</div>
            </li>
          ) : (
            sortedDatas.map((sortedData, index) => (
              <li key={sortedData.num} className={styles.listLine}>
                <div>{totalCount - index}</div>
                <div>{sortedData.registeredDate}</div>
                <div>{sortedData.reasonForRequest}</div>
                <div>{sortedData.content}</div>
                <div
                  className={`${styles.status} ${sortedData.requestStatus === "대기" ? styles.pending : styles.complete}`}
                >
                  {sortedData.requestStatus}
                </div>
                <div>
                  {sortedData.isClickable ? (
                    <Button color="red" onClick={() => handleModal(sortedData)}>
                      삭제
                    </Button>
                  ) : (
                    <Button color="gray" disabled style={{ cursor: "default", pointerEvents: "none" }}>
                      삭제
                    </Button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
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
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </main>
  );
};

export default ModificationHistory;