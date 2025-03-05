"use client";
import { useState, useEffect } from "react";
import Calendar from "./(components)/calendar";
import Dropdown from "../../components/common/dropdown/dropdown";
import AddClassModal from "./(components)/addClassModal";
import styles from "./page.module.scss";
import { classData } from "./classData";
import Button from "../../components/common/button/button";
import Icon from "../../components/common/icon/icon";

export default function Home() {
  // 1. 상수 정의
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
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
  // 수업 수정
  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };
  // 수업 삭제
  const handleDelete = (id) => {
    console.log("Deleting id:", id); // 삭제하려는 id 확인
    console.log("Before delete:", classListData); // 삭제 전 데이터
    setClassListData((prev) => {
      const newData = prev.filter((item) => item.id !== id);
      console.log("After delete:", newData); // 삭제 후 데이터
      return newData;
    });
  };

  // 월 변경 함수 추가
  const handleMonthChange = (increment) => {
    let newMonth = month + increment;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    setMonth(newMonth);
    setYear(newYear);
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
          <div className={styles.pagination}>
            <div
              className={styles.paginationIcon}
              onClick={() => handleMonthChange(-1)} // 이전 달
            >
              <Icon iconname="chevron_left" />
            </div>
            <p>
              {year}년 {month}월
            </p>
            <div
              className={styles.paginationIcon}
              onClick={() => handleMonthChange(1)} // 다음 달
            >
              <Icon iconname="chevron_right" />
            </div>
          </div>
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
