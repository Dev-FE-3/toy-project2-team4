"use client";
import { useState } from "react";
import styles from "../page.module.scss";
import Button from "../../../components/common/button/button"; // Button 컴포넌트
import Input from "../../../components/common/input/input"; // Input 컴포넌트
import Dropdown from "../../../components/common/dropdown/dropdown"; // Dropdown 컴포넌트

const AddClassModal = ({ onCancel, onCheck, instructors, courses, showModal }) => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [classDate, setClassDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 입력값이 변경될 때마다 상태 업데이트
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
    // 수업 추가 로직 (서버로 전송 또는 상태 변경 등)
    console.log({
      instructor: selectedInstructor,
      course: selectedCourse,
      date: classDate,
      startTime,
      endTime,
    });
    onCheck(); // 확인 후 모달 닫기
  };

  return (
    <div
      className={`${styles.modal} ${showModal ? styles.modalOpen : ""}`}
      onCancel={onCancel}
      onCheck={handleSubmit}
      title="수업 추가"
      titleIcon={<span>📝</span>}
      checkButtonColor="blue"
      showCancelButton={true}
    >
      <div className={styles.modalContent}>
        <h1>수업 추가</h1>
        <div className={styles.formGroup}>
          <label>강사</label>
          <Dropdown initialOptions={instructors} onSelect={handleInstructorSelect} />
        </div>

        <div className={styles.formGroup}>
          <label>강의명</label>
          <Dropdown initialOptions={courses} onSelect={handleCourseSelect} />
        </div>

        <div className={styles.formGroup}>
          <label>수업 일자</label>
          <Input type="date" onChange={handleDateChange} />
        </div>

        <div className={styles.formGroup}>
          <label>시작 시간</label>
          <Input type="time" onChange={handleStartTimeChange} />
        </div>

        <div className={styles.formGroup}>
          <label>종료 시간</label>
          <Input type="time" onChange={handleEndTimeChange} />
        </div>

        <div className={styles.modalButton}>
          <Button color="blue" onClick={handleSubmit}>
            등록
          </Button>
          <Button color="gray" onClick={onCancel}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddClassModal;
