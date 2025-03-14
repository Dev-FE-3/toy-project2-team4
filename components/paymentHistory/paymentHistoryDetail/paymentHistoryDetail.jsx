"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { formatSimpleDate } from "../../../utils/timeUtils";

import styles from "./paymentHistoryDetail.module.scss";
import Button from "../../common/button/button";
import Icon from "../../common/icon/icon";
import Dropdown from "../../common/dropdown/dropdown";
import paymentImg from "../../../public/images/mock_paymentHistory_2.webp";
import emptyImg from "../../../public/images/mock_paymentHistory_1.webp";

export const PaymentHistoryDetail = ({
  item,
  onClose,
  isRequestingCorrection,
  setIsRequestingCorrection,
  onOpenModal,
}) => {
  if (!item) {
    return null; // null일 경우 아무것도 렌더링하지 않음
  }

  const categoryOptions = ["업무 연장", "무급 휴가 사용", "휴일 근무", "기타"];

  // 초기값을 item.modification에서 가져오도록 설정
  const [content, setContent] = useState(item.modification?.message || "");
  const [selectedCategory, setSelectedCategory] = useState(item.modification?.category || categoryOptions[3]);

  const handleContentChange = (e) => {
    if (e.target.value.length <= 300) {
      setContent(e.target.value);
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleCorrectionRequest = () => {
    setIsRequestingCorrection(true);
  };

  const handleSaveRequest = async () => {
    const newModification = {
      message: content,
      isApproved: false,
      category: selectedCategory,
      createTime: new Date().toISOString(),
    };

    const updatedData = {
      ...item,
      modification: newModification,
    };

    setIsRequestingCorrection(false);
    onOpenModal();
  };

  const handleClose = () => {
    setContent(item.modification?.message || ""); // 내용 초기화 (기존 데이터 유지)
    setSelectedCategory(item.modification?.category || categoryOptions[3]); // 카테고리 초기화
    onClose(); // 부모에게 초기화 요청
  };

  useEffect(() => {
    setContent(item.modification?.message || "");
    setSelectedCategory(item.modification?.category || categoryOptions[3]);
  }, [item]); // item이 변경될 때 초기화

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.headerActions}>
            <div className={styles.dateText}>급여일: {formatSimpleDate(item.payDate)}</div>
            {isRequestingCorrection ? (
              <Button onClick={handleSaveRequest}>저장하기</Button>
            ) : (
              <Button onClick={handleCorrectionRequest}>정정요청</Button>
            )}
            <button className={styles.closeButton} onClick={handleClose}>
              <Icon iconname="close"></Icon>
            </button>
          </div>
        </div>

        {/* Form content */}
        <div className={styles.formContent}>
          {isRequestingCorrection ? (
            <>
              <div className={styles.selectContainer}>
                <label className={styles.select} htmlFor="categorySelect">
                  사유
                </label>
                <Dropdown
                  initialOptions={categoryOptions}
                  onSelect={handleCategoryChange}
                  defaultValue={selectedCategory}
                />
              </div>
              <div className={styles.textareaLabel}>
                <div className={styles.textMaxLength} htmlFor="contents">
                  <label>내용</label>
                  <small>({content.length}/300자)</small>
                </div>
              </div>
              <textarea
                id="contents"
                className={styles.textarea}
                value={content}
                onChange={handleContentChange}
                placeholder="글자 수 300자 이내로 수정할 내용을 입력해주세요."
              />
            </>
          ) : (
            <Image
              alt="paymentHistoryDetail"
              src={item.reportImg ? paymentImg : emptyImg}
              width={500}
              height={750}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
