import { Day } from "../index";
import styles from "./calendarDate.module.scss";
import { useSelector } from "react-redux";
export default function CalendarDate({ classList, onEdit, onDelete, isAdmin }) {
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
                  isAdmin={isAdmin}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );

  function getWeeksInMonth(year, month) {
    // 이번 달의 첫째 날과 마지막 날 구하기
    const firstDay = getFirstDayOfMonth(year, month);
    // 이번 달의 총 날짜 수
    const totalDays = getTotalDays(year, month);

    // (첫째 날 이전의 빈 칸 + 이번 달 날짜 수) ÷ 7 을 올림 처리
    return Math.ceil((firstDay + totalDays) / 7);
  }

  function getFirstDayOfMonth(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    // 첫째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    let firstDayOfWeek = firstDay.getDay();
    // 첫째 날의 요일 (0: 월요일, 1: 화요일, ..., 6: 일요일)
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    return firstDayOfWeek;
  }

  function getTotalDays(year, month) {
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();
    return totalDays;
  }

  function getClassForDay(classList, todayMonth, day) {
    const formattedDate = `${year}-${String(todayMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const todayClassList = classList.filter((classData) => classData.date === formattedDate);
    return todayClassList ? todayClassList : [];
  }
}
