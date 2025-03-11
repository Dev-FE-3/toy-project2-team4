"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { formatSimpleDate } from "../../../utils/timeUtils";
import { fetchData } from "../../../utils/apiUtils";
import styles from "./paymentHistoryDetail.module.scss";
import Button from "../../common/button/button";
import Icon from "../../common/icon/icon";
import Dropdown from "../../common/dropdown/dropdown";

export const PaymentHistoryDetail = ({
  item,
  onClose,
  isRequestingCorrection,
  setIsRequestingCorrection,
  onOpenModal,
}) => {
  if (item === null) {
    return null; // null일 경우 아무것도 렌더링하지 않음
  }

  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("default");

  const handleContentChange = (e) => {
    if (e.target.value.length <= 300) {
      setContent(e.target.value);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCorrectionRequest = () => {
    setIsRequestingCorrection(true);
  };

  const handleSaveRequest = async () => {
    const newCorrection = {
      message: content,
      isApproved: false,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
    };

    const updatedData = {
      ...item,
      corrections: [newCorrection],
    };

    try {
      setIsRequestingCorrection(false);
      onOpenModal();
      await fetchData("/test", updatedData, "POST");
    } catch (error) {
      console.error("데이터 패칭 오류:", error);
    }
  };

  const handleClose = () => {
    setContent(""); // 내용 초기화
    onClose(); // 부모에게 초기화 요청
  };

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 상태 초기화
    return () => {
      setContent("");
      setSelectedCategory("default");
    };
  }, []);

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
                <Dropdown initialOptions={["업무 연장", "무급 휴가 사용", "휴일 근무", "기타"]}></Dropdown>
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
              src={item.reportImg}
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
