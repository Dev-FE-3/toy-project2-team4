"use client";

import { useMemo } from "react";

import { formatSimpleDate } from "../../../utils/timeUtils";
import styles from "./paymentHistoryList.module.scss";

export const PaymentHistoryList = ({ items, onClick, emptyMessage }) => {
  const sortedItems = useMemo(() => [...items].sort((a, b) => b.id - a.id), [items]);

  const handleOpenDetail = (item) => {
    onClick(item);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.totalAmount}>총 {items.length}개</div>
        <div className={styles.header}>
          <div className={styles.itemContent}>번호</div>
          <div className={styles.itemContent}>급여일</div>
          <div className={styles.titleContent}>제목</div>
          <div className={styles.itemContent}>지급총액</div>
          <div className={styles.itemContent}>실지급액</div>
          <div className={styles.itemContent}>열람하기</div>
        </div>
        {items.length === 0 ? (
          <div className={styles.emptyMessage}>{emptyMessage}</div>
        ) : (
          <ul className={styles.ul}>
            {sortedItems.map((item, index) => (
              <li key={item.id} className={styles.listItem}>
                <div className={styles.itemContent}>{sortedItems.length - index}</div>
                <div className={styles.itemContent}>{formatSimpleDate(item.payDate)}</div>
                <div className={styles.titleContent}>{item.title}</div>
                <div className={styles.itemContent}>{item.totalAmount.toLocaleString()}</div>
                <div className={styles.itemContent}>{item.actualAmount.toLocaleString()}</div>
                <div className={styles.itemContent}>
                  <button className={styles.viewButton} onClick={() => handleOpenDetail(item)}>
                    열람하기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
