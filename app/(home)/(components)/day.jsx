import ClassList from "./classList"
import styles from "../page.module.scss";
export default function Day({ otherMonth, month, dayIndex, day , classList}) {
  return (
    <div className={`${styles.dayComponent} ${otherMonth ? styles.otherMonth : ""}`}>
      <div className={styles.dayIndex}>{day}</div>
      <ClassList classList={classList} />
    </div>
  );
}
