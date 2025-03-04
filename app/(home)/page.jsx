"use client";
import { useState, useEffect } from "react";
import Calendar from "./(components)/calendar";
import Dropdown from "../../components/common/dropdown/dropdown";
import AddClassModal from "./(components)/addClassModal";
import styles from "./page.module.scss";
import { classData } from "./classData";
import Button from "../../components/common/button/button";

export default function Home() {
  // 1. 상수 정의
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const instructors = ["장은혜", "양정규", "표현경", "박현수"];
  const courses = ["React", "CSS", "C++", "JavaScript", "TypeScript", "Python", "Java", "Swift", "Go", "Kotlin"];

  // 2. 상태 관리
  const [selectedFilter, setSelectedFilter] = useState("장은혜"); // 드롭다운 필터링
  const [classListData, setClassListData] = useState(classData); // 수업 데이터
  const [showModal, setShowModal] = useState(false); // 수업 추가/수정 모달
  const [selectedClass, setSelectedClass] = useState(null); // 선택한 수업(admin)

  // 3. 유틸리티 함수
  const getClassList = (classData, selectedFilter) => {
    return selectedFilter === "전체보기" ? classData : classData.filter((item) => item.instructor === selectedFilter);
  };

  // 4. 이벤트 핸들러
  // 필터링
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };
  
  const handleAddClass = (newClass) => {
    if (selectedClass) {
      setClassListData((prev) => // 수정 : 기존 수업의 데이터를 변경
        prev.map((item) => (item.id === selectedClass.id ? { ...newClass, id: selectedClass.id } : item)),
      );
    } else { // 수업 추가: 기존 데이터에 새로운 수업 데이터 추가
      setClassListData((prev) => [...prev, { ...newClass, id: Date.now() }]);
    }
    handleModalClose();
  };
  // 모달 닫기
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedClass(null);
  };
  // 수업 수정
  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };
  // 수업 삭제
  const handleDelete = (id) => {
    setClassListData((prev) => prev.filter((item) => item.id !== id));
  };

  // 5. 계산된 값
  // 강사별 필터링된 수업 리스트
  const filteredClassList = getClassList(classListData, selectedFilter);

  // 6. 렌더링
  return (
    <>
      <div>수업 확인 페이지</div>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <Dropdown initialOptions={["전체보기", ...instructors]} onSelect={handleFilterSelect} />
          <p>
            {year}년 {month}월
          </p>
          <Button color="blue" onClick={() => setShowModal(true)}>
            수업 추가
          </Button>
        </div>

        <Calendar
          year={year}
          month={month}
          classList={filteredClassList}
          onEdit={handleEditClass}
          onDelete={handleDelete}
        />

        <AddClassModal
          onCancel={handleModalClose}
          onCheck={handleAddClass}
          instructors={instructors}
          title={courses}
          showModal={showModal}
          defaultValues={selectedClass}
        />
      </div>
    </>
  );
}
