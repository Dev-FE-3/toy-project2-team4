import Dropdown from "../../common/dropdown/dropdown";
import Button from "../../common/button/button";
import Icon from "../../common/icon/icon";
import styles from "./calendarHeader.module.scss";
import React from "react";
import { setMonth, setYear } from "../../../store/reducers/classCalendarReducer/classCalendarActions";
import { useDispatch, useSelector } from "react-redux";
export default function CalendarHeader({ INSTRUCTORS, selectedFilter, setSelectedFilter, setShowModal }) {
  // Redux에서 전역 상태 가져오기
  const role = useSelector((state) => state.auth.user?.role);
  const isAdmin = role === "admin";
  const year = useSelector((state) => state.classCalendar.year);
  const month = useSelector((state) => state.classCalendar.month);
  const dispatch = useDispatch();

  // 필터링
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  // 월 변경 함수 추가
  const handleMonthChange = (increment) => {
    let newMonth = month + increment;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
      dispatch(setYear(newYear)); // Redux 상태 업데이트
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
      dispatch(setYear(newYear)); // Redux 상태 업데이트
    }

    dispatch(setMonth(newMonth)); // Redux 상태 업데이트
  };

  return (
    <div className={styles.calendarHeader}>
      <div className={styles.filteringDropdown}>
        <Dropdown
          initialOptions={["전체보기", ...INSTRUCTORS]}
          onSelect={handleFilterSelect}
          defaultValue={selectedFilter}
        />
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.paginationIcon}
          onClick={() => handleMonthChange(-1)} // 이전 달
        >
          <Icon iconname="chevron_left" />
        </button>
        <p>
          {year}년 {month}월
        </p>
        <button
          className={styles.paginationIcon}
          onClick={() => handleMonthChange(1)} // 다음 달
        >
          <Icon iconname="chevron_right" />
        </button>
      </div>
      <div className={styles.classAddButton}>
        {isAdmin && (
          <Button color="blue" onClick={() => setShowModal(true)}>
            수업 추가
          </Button>
        )}
      </div>
    </div>
  );
}
