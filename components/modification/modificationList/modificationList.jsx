"use client";
import styles from "./modificationList.module.scss";
import Button from "../../common/button/button"
import { useDispatch } from "react-redux";
import { setSelectedList } from "../../../store/reducers/modificationHistoryReducer";
import { formatSimpleDate } from "../../../utils/timeUtils";

const ModificationList = ({ sortedDatas, totalCount, handleModal }) => {
  const dispatch = useDispatch();

  const handleOpenModal = (selectedList) => {
    console.log("모달 열기 - isApproved 값 확인:", selectedList.modification.isApproved);
    dispatch(setSelectedList(selectedList));
    handleModal(selectedList);
  };

  return (
    <ul className={styles.listContent}>
      {sortedDatas.length === 0 ? (
        <li className={styles.noData}>
          <div>정정 신청 내역이 없습니다.</div>
        </li>
      ) : (
        sortedDatas.map((list, index) => (
          <li key={list.id} className={styles.listLine}>
            <div>{totalCount - index}</div>
            <div>{formatSimpleDate(list.modification.createTime)}</div>
            <div>{list.modification.category}</div>
            <div>{list.modification.message}</div>
            <div className={`${styles.status} ${list.modification.isApproved ? styles.complete : styles.pending}`}>
              {list.modification.isApproved ? "정정완료" : "대기"}
            </div>
            <div>
              {list.modification.isApproved ? (
                <Button color="gray" disabled style={{ cursor: "default", pointerEvents: "none" }}>
                  삭제
                </Button>
              ) : (
                <Button color="red" onClick={() => handleOpenModal(list)}>
                  삭제
                </Button>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ModificationList;
