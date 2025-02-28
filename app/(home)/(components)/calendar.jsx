import CalendarDate from "./calendarDate";
import styles from "./calendar.module.scss";
export default function Calendar({ currentDate }) {
  return (
    <>
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
        <CalendarDate />
      </div>
    </>
  );
}
