import CalendarDate from "./calendarDate";
import styles from "../page.module.scss";
export default function Calendar({ year, month, classList, onEdit, onDelete }) {
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
        <CalendarDate year={year} month={month} classList={classList} onEdit={onEdit} onDelete={onDelete}/>
      </div>
    </>
  );
}
