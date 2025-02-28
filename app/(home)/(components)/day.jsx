import styles from "./calendar.module.scss";
export default function Day({dayIndex}) {

  return <div className={styles.day}>day{dayIndex}</div>;
}
