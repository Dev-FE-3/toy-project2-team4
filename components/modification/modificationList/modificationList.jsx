"use client";
import styles from "./modificationList.module.scss";
import Button from "../../common/button/button"
import { useDispatch } from "react-redux";
import { setSelectedList } from "../../../store/reducers/modificationHistoryReducer";
import { formatSimpleDate } from "../../../utils/timeUtils";

const ModificationList = ({ sortedDatas, totalCount, handleModal }) => {
  const dispatch = useDispatch();

  const handleOpenModal = (sortedData) => {
    console.log("모달 열기 - isApproved 값 확인:", sortedData.modification.isApproved);
    dispatch(setSelectedList(sortedData));
    handleModal(sortedData);
  };

  return (
    <ul className={styles.listContent}>
      {sortedDatas.length === 0 ? (
        <li className={styles.noData}>
          <div>정정 신청 내역이 없습니다.</div>
        </li>
      ) : (
        sortedDatas.map((sortedData, index) => (
          <li key={sortedData.id} className={styles.listLine}>
            <div>{totalCount - index}</div>
            <div>{formatSimpleDate(sortedData.modification.createTime)}</div>
            <div>{sortedData.modification.category}</div>
            <div>{sortedData.modification.message}</div>
            <div
              className={`${styles.status} ${sortedData.modification.isApproved ? styles.complete : styles.pending}`}
            >
              {sortedData.modification.isApproved ? "정정완료" : "대기"}
            </div>
            <div>
              {sortedData.modification.isApproved ? (
                <Button color="gray" disabled style={{ cursor: "default", pointerEvents: "none" }}>
                  삭제
                </Button>
              ) : (
                <Button color="red" onClick={() => handleOpenModal(sortedData)}>
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
