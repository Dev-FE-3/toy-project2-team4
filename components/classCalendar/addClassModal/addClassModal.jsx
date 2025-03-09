"use client";
import { useState, useEffect } from "react";
import styles from "./addClassModal.module.scss";
import Button from "../../common/button/button";
import Input from "../../common/input/input";
import Dropdown from "../../common/dropdown/dropdown";

const AddClassModal = ({ onCancel, onCheck, instructors, title, showModal, defaultValues }) => {
  const [isWrong, setIsWrong] = useState({
    instructor: false,
    title: false,
    date: false,
    startTime: false,
    endTime: false,
  });
  const [formData, setFormData] = useState({
    instructor: defaultValues?.instructor || "",
    title: defaultValues?.title || "",
    date: defaultValues?.date || "",
    startTime: defaultValues?.startTime || "",
    endTime: defaultValues?.endTime || "",
  });

  const resetForm = () => {
    setFormData({
      instructor: "",
      title: "",
      date: "",
      startTime: "",
      endTime: "",
    });
    setIsWrong({
      instructor: false,
      title: false,
      date: false,
      startTime: false,
      endTime: false,
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (value) {
      setIsWrong((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleSubmit = () => {
    // 각 필드별로 비어있는지 확인하고 wrongFields 업데이트
    const newWrongFields = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: !formData[key],
      }),
      {},
    );

    setIsWrong(newWrongFields);

    // 하나라도 비어있으면 제출하지 않음
    if (Object.values(newWrongFields).some((isWrong) => isWrong)) {
      return;
    }
    onCheck(formData); // formData를 직접 전달
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        instructor: defaultValues.instructor || "",
        title: defaultValues.title || "",
        date: defaultValues.date || "",
        startTime: defaultValues.startTime || "",
        endTime: defaultValues.endTime || "",
      });
    } else {
      resetForm();
    }
  }, [defaultValues]);

  return (
    <div className={`${styles.modal} ${showModal ? styles.modalOpen : ""}`}>
      <div className={styles.modalContent}>
        <h1>{defaultValues ? "수업 수정" : "수업 추가"}</h1>
        <div className={styles.formGroup}>
          <label>강사</label>
          <div className={`${isWrong.instructor ? styles.isWrong : ""}`}>
            <Dropdown
              key={`instructor-${defaultValues?.instructor || "new"}-${showModal}`}
              initialOptions={instructors}
              onSelect={(value) => handleChange("instructor", value)}
              defaultValue={defaultValues?.instructor || ""}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>강의명</label>
          <div className={`${isWrong.title ? styles.isWrong : ""}`}>
            <Dropdown
              key={`course-${defaultValues?.title || "new"}-${showModal}`}
              initialOptions={title}
              onSelect={(value) => handleChange("title", value)}
              defaultValue={defaultValues?.title || ""}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>수업 일자</label>
          <Input
            key={`date-${defaultValues?.date || "new"}-${showModal}`}
            type="date"
            isWrong={isWrong.date}
            onChange={(value) => handleChange("date", value)}
            defaultValue={defaultValues?.date || ""}
          />
        </div>

        <div className={styles.formGroup}>
          <label>시작 시간</label>
          <Input
            key={`start-${defaultValues?.startTime || "new"}-${showModal}`}
            type="time"
            isWrong={isWrong.startTime}
            onChange={(value) => handleChange("startTime", value)}
            defaultValue={defaultValues?.startTime || ""}
          />
        </div>

        <div className={styles.formGroup}>
          <label>종료 시간</label>
          <Input
            key={`end-${defaultValues?.endTime || "new"}-${showModal}`}
            type="time"
            isWrong={isWrong.endTime}
            onChange={(value) => handleChange("endTime", value)}
            defaultValue={defaultValues?.endTime || ""}
          />
        </div>

        <div className={styles.modalButton}>
          <Button color="blue" onClick={handleSubmit}>
            {defaultValues ? "수정" : "등록"}
          </Button>
          <Button color="gray" onClick={handleCancel}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddClassModal;
