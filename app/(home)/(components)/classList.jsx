import styles from "../page.module.scss";
export default function ClassList({ classList }) {
  const classes = classList.length;
  console.log(classList)
  return (
    <div className={styles.classList}>
      {classList.map((item, index) => (
        <div key={index} className={styles.classItem}>
            <p key={index}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}
