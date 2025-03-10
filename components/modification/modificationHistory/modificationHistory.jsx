"use client";
import styles from "./modificationHistory.module.scss";
import Icon from "../../common/icon/icon";
import Modal from "../../common/modal/modal";
import { useEffect, useState } from "react";
import ModificationList from "../modificationList/modificationList";
import { useDispatch, useSelector } from "react-redux";

const ModificationHistory = () => {
  const [listDatas, setListDatas] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const userEmail = "test@test.com";

  useEffect(() => {
    fetch("/modificationData.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("데이터 패칭 성공!", data.datas);
        const filteredData = data.datas.filter((item) => item.email === userEmail);
        setListDatas(filteredData);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

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
      <h1 className={styles.pageTitle}>정정 내역</h1>
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
            <br />
            사유: {selectedList?.reasonForRequest}
            <br />
            내용: {selectedList?.content}
          </p>
        </Modal>
      )}

      <div>
        <h1>Counter: {count} </h1>
        <button onClick={increment}>+증가 시키기</button>
        <button onClick={decrement}>-감소 시키기</button>
      </div>
    </main>
  );
};

export default ModificationHistory;
