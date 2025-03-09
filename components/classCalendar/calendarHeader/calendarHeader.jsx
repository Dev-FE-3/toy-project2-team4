import Dropdown from "../../common/dropdown/dropdown";
import Button from "../../common/button/button";
import Icon from "../../common/icon/icon";
import styles from "./calendarHeader.module.scss";
export default function CalendarHeader({
  year,
  setYear,
  month,
  setMonth,
  INSTRUCTORS,
  isAdmin,
  selectedFilter,
  setSelectedFilter,
  setShowModal,
}) {
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
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <div className={styles.calendarHeader}>
      <Dropdown initialOptions={["전체보기", ...INSTRUCTORS]} onSelect={handleFilterSelect} defaultValue={selectedFilter}/>
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
