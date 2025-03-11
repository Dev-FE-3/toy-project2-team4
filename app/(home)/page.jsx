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
import { useSelector } from "react-redux";

export default function Home() {

  const userName = useSelector((state) => state.auth.user?.name) // 로그인된 사용자 정보(name)
  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin"
  const [selectedFilter, setSelectedFilter] = useState(isAdmin ? "전체보기" : userName);
  const [classListData, setClassListData] = useState(classData); // 수업 데이터
  const [showModal, setShowModal] = useState(false); // 수업 추가/수정 모달
  const [selectedClass, setSelectedClass] = useState(null); // 선택한 수업(admin)

  // 유틸리티 함수
  const getClassList = (classData, selectedFilter) => {
    return selectedFilter === "전체보기" ? classData : classData.filter((item) => item.instructor === selectedFilter);
  };

  // 이벤트 핸들러

  // 수업 추가/수정
  const handleSaveClass = (newClass) => {
    if (selectedClass) {
      setClassListData((list) =>
        list.map((item) => (item.id === selectedClass.id ? { ...newClass, id: selectedClass.id } : item)),
      );
    } else {
      // 수업 추가: 기존 데이터에 새로운 수업 데이터 추가
      setClassListData((list) => [...list, { ...newClass, id: Date.now() }]);
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
    setClassListData((list) => {
      const newData = list.filter((item) => item.id !== id);
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
          INSTRUCTORS={INSTRUCTORS}
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
            classList={filteredClassList}
            onEdit={handleEditClass}
            onDelete={handleDelete}
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
