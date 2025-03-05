"use client";
import { useState, useEffect } from "react";
import styles from "../page.module.scss";
import Button from "../../../components/common/button/button";
import Input from "../../../components/common/input/input";
import Dropdown from "../../../components/common/dropdown/dropdown";

const AddClassModal = ({ onCancel, onCheck, instructors, title, showModal, defaultValues }) => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [classDate, setClassDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const resetForm = () => {
    setSelectedInstructor("");
    setSelectedCourse("");
    setClassDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleInstructorSelect = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleDateChange = (date) => {
    setClassDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleSubmit = () => {
    const classData = {
      instructor: selectedInstructor,
      title: selectedCourse,
      date: classDate,
      startTime,
      endTime,
    };
    onCheck(classData);
    resetForm();
  };

  const handleCancel = () => {
    console.log(selectedInstructor);
    console.log(selectedCourse);
    console.log(classDate);
    console.log(startTime);
    console.log(endTime);
    resetForm();
    onCancel();
  };

  useEffect(() => {
    if (defaultValues) {
      setSelectedInstructor(defaultValues.instructor || "");
      setSelectedCourse(defaultValues.title || "");
      setClassDate(defaultValues.date || "");
      setStartTime(defaultValues.startTime || "");
      setEndTime(defaultValues.endTime || "");

      // setClassDate(defaultValues.date ? defaultValues.date.split('T')[0] : "");
      // setStartTime(defaultValues.startTime ? defaultValues.startTime.slice(0, 5) : "");
      // setEndTime(defaultValues.endTime ? defaultValues.endTime.slice(0, 5) : "");
    } else {
      resetForm();
    }
  }, [defaultValues, showModal]);

  return (
    <div className={`${styles.modal} ${showModal ? styles.modalOpen : ""}`}>
      <div className={styles.modalContent}>
        <h1>{defaultValues ? "수업 수정" : "수업 추가"}</h1>
        <div className={styles.formGroup}>
          <label>강사</label>
          <Dropdown
            key={`instructor-${defaultValues?.instructor || "new"}-${showModal}`}
            initialOptions={instructors}
            onSelect={handleInstructorSelect}
            defaultValue={selectedInstructor}
          />
        </div>

        <div className={styles.formGroup}>
          <label>강의명</label>
          <Dropdown
            key={`course-${defaultValues?.title || "new"}-${showModal}`}
            initialOptions={title}
            onSelect={handleCourseSelect}
            defaultValue={selectedCourse}
          />
        </div>

        <div className={styles.formGroup}>
          <label>수업 일자</label>
          <Input
            key={`date-${defaultValues?.date || "new"}-${showModal}`}
            type="date"
            onChange={handleDateChange}
            defaultValue={classDate}
          />
        </div>

        <div className={styles.formGroup}>
          <label>시작 시간</label>
          <Input
            key={`start-${defaultValues?.startTime || "new"}-${showModal}`}
            type="time"
            onChange={handleStartTimeChange}
            defaultValue={startTime}
          />
        </div>

        <div className={styles.formGroup}>
          <label>종료 시간</label>
          <Input
            key={`end-${defaultValues?.endTime || "new"}-${showModal}`}
            type="time"
            onChange={handleEndTimeChange}
            defaultValue={endTime}
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
