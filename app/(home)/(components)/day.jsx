import styles from "../page.module.scss";
export default function Day({ otherMonth, month, dayIndex, day }) {
  return (
    <div className={`${styles.dayComponent} ${otherMonth ? styles.otherMonth : ""}`}>
      <div className={styles.dayIndex}>{day}</div>
    </div>
  );
}
