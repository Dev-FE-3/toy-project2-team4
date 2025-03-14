"use client";
import styles from "./modificationHistory.module.scss";
import Icon from "../../common/icon/icon";
import Modal from "../../common/modal/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModificationList from "../modificationList/modificationList";
import { setListDatas, setSelectedList, deleteList } from "../../../store/reducers/modificationHistoryReducer";
import { useFetch } from "../../../hooks/useFetch";

const ModificationHistory = () => {
  const dispatch = useDispatch();
  const { listDatas, selectedList } = useSelector((state) => state.modificationHistory); // Redux에서 상태 가져오기
  const userInfo = useSelector((state) => state.auth.user);
  const userEmail = userInfo?.email || "";
  const [isModal, setIsModal] = useState(false);

  // 로컬 스토리지에서 데이터 가져오기
  const savedData = localStorage.getItem("paymentData");
  const shouldFetch = !savedData;
  const { data } = useFetch(shouldFetch ? `http://localhost:3000/api/paymentHistory` : null);

  useEffect(() => {
    let listDatas;

    if (savedData) {
      console.log("로컬 스토리지에서 데이터 불러옴: ", JSON.parse(savedData));
      listDatas = JSON.parse(savedData);
    } else if (data) {
      // API 데이터를 가져온 경우 로컬 스토리지에 저장
      console.log("API에서 가져온 데이터:", data);
      listDatas = data;
      // 로컬 스토리지에 데이터 저장
      localStorage.setItem("paymentData", JSON.stringify(data));
    }

    if (listDatas) {
      const filteredDatas = listDatas.filter((list) => list.email === userEmail);
      dispatch(setListDatas(filteredDatas));
    }
  }, [data, userEmail, dispatch, savedData]);

  console.log("패치로 가져온 데이터 확인:", data);

  const sortedDatas = [...listDatas].sort(
    (a, b) => new Date(b.modification.createTime) - new Date(a.modification.createTime),
  );

  const totalCount = sortedDatas.length;

  const handleModal = (selectedList) => {
    dispatch(setSelectedList(selectedList));
    setIsModal(true);
  };

  const handleListDelete = () => {
    if (!selectedList?.id) return;

    const savedData = localStorage.getItem("paymentData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // 삭제할 데이터(`selectedList.id`)를 제외한 새로운 배열 생성
      const updatedData = parsedData.filter((item) => item.id !== selectedList.id);

      // 로컬 스토리지에 업데이트된 데이터 저장
      localStorage.setItem("paymentData", JSON.stringify(updatedData));
      dispatch(deleteList(selectedList.id));
    }
    setIsModal(false);
  };

  return (
    <main className={styles.container}>
      <p className={styles.totalCount}>
        총 <strong>{totalCount}</strong> 개
      </p>
      <div className={styles.listWapper}>
        <li className={styles.listTitle}>
          <div>번호</div>
          <div>날짜</div>
          <div>사유</div>
          <div>내용</div>
          <div>상태</div>
          <div>삭제</div>
        </li>

        <ModificationList sortedDatas={sortedDatas} totalCount={totalCount} handleModal={handleModal} />
      </div>

      {isModal && (
        <Modal
          onCheck={handleListDelete}
          onCancel={() => setIsModal(false)}
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
            <br />
            사유: {selectedList?.modification?.category}
            <br />
            내용: {selectedList?.modification?.message}
          </p>
        </Modal>
      )}
    </main>
  );
};

export default ModificationHistory;
