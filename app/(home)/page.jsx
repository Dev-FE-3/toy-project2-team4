"use client";
import Calendar from "./(components)/calendar";
import Dropdown from "../../components/common/dropdown/dropdown";
import AddClassModal from "./(components)/addClassModal"
import styles from "./page.module.scss";
import { useState } from "react";
import { classData } from "./classData";
import Button from "../../components/common/button/button";

export default function Home() {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 현재 년도
  const month = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줍니다)
  const [selectedFilter, setSelectedFilter] = useState("장은혜"); // 드롭다운에서 선택된 필터

  // 필터링된 수업을 처리하는 함수
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter); // 선택된 필터 값 상태로 업데이트
  };

  const classList = getClassList(classData, selectedFilter);

  const [showModal, setShowModal] = useState(false);

  const instructors = ["장은혜", "양정규", "표현경"]; // 강사 목록 예시
  const courses = ["React", "CSS", "C++", "JavaScript"]; // 강의명 목록 예시

  const handleModalCancel = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleModalCheck = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <>
      <div>수업 확인 페이지</div>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <Dropdown
            initialOptions={["전체보기", "장은혜", "표현경", "양정규", "박현수"]}
            onSelect={handleFilterSelect}
          />
          <p>
            {year}년 {month}월
          </p>
          <Button color="blue" onClick={() => setShowModal(true)}>
          수업 추가
          </Button>
          <AddClassModal
            onCancel={handleModalCancel}
            onCheck={handleModalCheck}
            instructors={instructors}
            courses={courses}
            showModal={showModal}
          />
        </div>
        <Calendar year={year} month={month} classList={classList} />
      </div>
    </>
  );

  function getClassList(classData, selectedFilter) {
    const filteredClassList =
      selectedFilter === "전체보기" ? classData : classData.filter((item) => item.instructor === selectedFilter);
    // 선택된 필터에 맞는 수업만 필터링

    return filteredClassList ? filteredClassList : [];
  }
}
