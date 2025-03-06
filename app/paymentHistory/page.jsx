"use client";

import { useState } from "react";

import { PaymentHistoryList, PaymentHistoryDetail } from "../../components/paymentHistory/index";
import Modal from "../../components/common/modal/modal";
import Icon from "../../components/common/icon/icon";
import styles from "./paymentHistory.module.scss";
import { paymentHistoryData } from "./data";

const PaymentHistory = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isRequestingCorrection, setIsRequestingCorrection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleSelectNews = (news) => {
    setSelectedNews(news);
    setIsRequestingCorrection(false);
  };

  const handleCloseDetail = () => {
    setSelectedNews(null);
    setIsRequestingCorrection(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.list} ${!selectedNews ? styles.fullWidth : ""}`}>
          <PaymentHistoryList
            items={paymentHistoryData}
            onClick={handleSelectNews}
            emptyMessage={"급여 내역 정보가 없습니다"}
          />
        </div>
        {selectedNews && (
          <div className={`${styles.detail} ${selectedNews ? styles.visible : ""}`}>
            <PaymentHistoryDetail
              item={selectedNews}
              onClose={handleCloseDetail}
              isRequestingCorrection={isRequestingCorrection}
              setIsRequestingCorrection={setIsRequestingCorrection}
              onOpenModal={handleOpenModal}
            />
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          onCancel={handleCloseModal}
          onCheck={handleCloseModal}
          title="수정 완료"
          titleIcon={<Icon iconname={"check"} size={"19px"} color={"#3199fe"} />}
          checkButtonColor="blue"
          showCancelButton={false}
        >
          <p>정상적으로 정정요청이 완료되었습니다.</p>
        </Modal>
      )}
    </>
  );
};

export default PaymentHistory;
