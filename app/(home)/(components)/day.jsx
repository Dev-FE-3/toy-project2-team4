import ClassList from "./classList";
import styles from "../page.module.scss";
import { useState } from "react";
export default function Day({ otherMonth, month, dayIndex, day, classList, onEdit, onDelete, isAdmin }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`${styles.dayComponent} ${otherMonth ? styles.otherMonth : ""}  ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.dayIndex}>{day}</div>
      <ClassList classList={classList}  isExpanded={isExpanded} toggleExpand={toggleExpand} onEdit={onEdit} onDelete={onDelete} isAdmin={isAdmin}/>
    </div>
  );
}
