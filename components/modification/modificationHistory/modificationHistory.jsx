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
  const { listDatas, selectedList } = useSelector((state) => state.modificationHistory);
  const userInfo = useSelector((state) => state.auth.user);
  const userEmail = userInfo?.email || "";
  const [isModal, setIsModal] = useState(false);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("paymentData");
      setLocalData ? JSON.parse(savedData) : null;
    }
  }, []);

  const { data } = useFetch(localData ? null : `http://localhost:3000/api/paymentHistory`);

  useEffect(() => {
    let tempListDatas = null;

    if (localData) {
      tempListDatas = localData;
    } else if (data) {
      tempListDatas = data;
      localStorage.setItem("paymentData", JSON.stringify(data));
    }

    if (tempListDatas) {
      const filteredDatas = tempListDatas.filter((list) => list.email === userEmail);
      dispatch(setListDatas(filteredDatas));
    }
  }, [data, userEmail, dispatch, localData]);

  const sortedDatas = Array.isArray(listDatas)
    ? [...listDatas].sort((a, b) => new Date(b.modification.createTime) - new Date(a.modification.createTime))
    : [];

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
      const updatedData = parsedData.filter((item) => item.id !== selectedList.id);

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
