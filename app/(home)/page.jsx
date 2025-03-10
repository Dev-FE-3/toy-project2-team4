"use client";
import { useState } from "react";
import {
  AddClassModal,
  CalendarDate,
  CalendarHeader,
  CLASS_TITLES,
  classData,
  INSTRUCTORS,
} from "../../components/classCalendar/index";
import styles from "./page.module.scss";

export default function Home() {
  // 상수 정의
  const currentDate = new Date();

  // 상태 관리
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [selectedFilter, setSelectedFilter] = useState("장은혜"); // 기본값도 상수에서 가져오기
  const [classListData, setClassListData] = useState(classData); // 수업 데이터
  const [showModal, setShowModal] = useState(false); // 수업 추가/수정 모달
  const [selectedClass, setSelectedClass] = useState(null); // 선택한 수업(admin)
  const [isAdmin] = useState(true); // 실제로는 로그인 상태나 권한에 따라 결정될 것

  // 유틸리티 함수
  const getClassList = (classData, selectedFilter) => {
    return selectedFilter === "전체보기" ? classData : classData.filter((item) => item.instructor === selectedFilter);
  };

  // 이벤트 핸들러

  // 수업 추가/수정
  const handleSaveClass = (newClass) => {
    if (selectedClass) {
      setClassListData(
        (
          prev, // 수정 : 기존 수업의 데이터를 변경
        ) => prev.map((item) => (item.id === selectedClass.id ? { ...newClass, id: selectedClass.id } : item)),
      );
    } else {
      // 수업 추가: 기존 데이터에 새로운 수업 데이터 추가
      setClassListData((prev) => [...prev, { ...newClass, id: Date.now() }]);
    }
    handleModalClose();
  };
  // 모달 닫기
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedClass(null);
  };
  // 수업 수정 버튼 클릭
  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };
  // 수업 삭제 버튼 클릭
  const handleDelete = (id) => {
    setClassListData((prev) => {
      const newData = prev.filter((item) => item.id !== id);
      return newData;
    });
  };

  // 계산된 값
  // 강사별 필터링된 수업 리스트
  const filteredClassList = getClassList(classListData, selectedFilter);

  // 렌더링
  return (
    <>
      <div>수업 확인 페이지</div>
      <div className={styles.calendarContainer}>
        <CalendarHeader
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          INSTRUCTORS={INSTRUCTORS}
          isAdmin={isAdmin}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setShowModal={setShowModal}
        />
        <div className={styles.CalendarSection}>
          <ul className={styles.dayLabel}>
            <li>월요일</li>
            <li>화요일</li>
            <li>수요일</li>
            <li>목요일</li>
            <li>금요일</li>
            <li>토요일</li>
            <li>일요일</li>
          </ul>
          <CalendarDate
            year={year}
            month={month}
            classList={filteredClassList}
            onEdit={handleEditClass}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />
        </div>

        <AddClassModal
          onCancel={handleModalClose}
          onCheck={handleSaveClass}
          INSTRUCTORS={INSTRUCTORS}
          title={CLASS_TITLES}
          showModal={showModal}
          defaultValues={selectedClass}
        />
      </div>
    </>
  );
}
