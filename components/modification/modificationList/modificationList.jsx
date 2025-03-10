"use client";
import styles from "./modificationList.module.scss";
import Button from "../../common/button/button"

const ModificationList = ({ sortedDatas, totalCount, handleModal, listDatas }) => {
  return (
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
  );
};

export default ModificationList;
