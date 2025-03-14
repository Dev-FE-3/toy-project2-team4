import { Day } from "../index";
import styles from "./calendarDate.module.scss";
import { useSelector } from "react-redux";
export default function CalendarDate({ classList, onEdit, onDelete }) {
  // Redux에서 전역 상태 가져오기
  const year = useSelector((state) => state.classCalendar.year);
  const month = useSelector((state) => state.classCalendar.month);

  const daysInWeek = 7;
  const weeksInMonth = getWeeksInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const totalDays = getTotalDays(year, month);

  return (
    <>
      <div className={styles.calendarDate}>
        {Array.from({ length: weeksInMonth }).map((_, week) => (
          <div key={week} className={styles.calendarRow}>
            {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
              let day = week * 7 + dayIndex - firstDayOfMonth + 1; // 날짜 인덱스 계산
              let todayMonth = month;
              if (day > totalDays) {
                day -= totalDays;
                todayMonth++;
              } else if (day <= 0) {
                todayMonth--;
                const totalDays = getTotalDays(year, todayMonth);
                day = totalDays + day;
              }
              const otherMonth = todayMonth !== month;

              const todayClassList = getClassForDay(classList, todayMonth, day);
              return (
                <Day
                  key={`${week}-${dayIndex}`}
                  otherMonth={otherMonth}
                  month={todayMonth}
                  dayIndex={dayIndex}
                  day={day}
                  classList={todayClassList}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
  // 주수 계산
  function getWeeksInMonth(year, month) {
    const firstDay = getFirstDayOfMonth(year, month);
    const totalDays = getTotalDays(year, month);
    return Math.ceil((firstDay + totalDays) / 7);
  }
  // 1일 요일 계산
  function getFirstDayOfMonth(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    let firstDayOfWeek = firstDay.getDay();
    // 첫째 날의 요일 (0: 월요일, 1: 화요일, ..., 6: 일요일)
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    return firstDayOfWeek;
  }
  // 달 일수 계산
  function getTotalDays(year, month) {
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();
    return totalDays;
  }
  // 해당일의 수업목록 필터링
  function getClassForDay(classList, todayMonth, day) {
    const formattedDate = `${year}-${String(todayMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const todayClassList = classList.filter((classData) => classData.date === formattedDate);
    return todayClassList ? todayClassList : [];
  }
}
