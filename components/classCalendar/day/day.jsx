import { ClassItem } from "../index";
import Icon from "../../common/icon/icon";
import styles from "./day.module.scss";
import { useState } from "react";
export default function Day({ otherMonth, day, classList, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // classList 확장
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 시간순 정렬
  const sortByTime = (classList) => {
    return classList.sort((a, b) => {
      const [aHours, aMinutes] = a.startTime.split(":").map(Number);
      const [bHours, bMinutes] = b.startTime.split(":").map(Number);

      if (aHours === bHours) {
        return aMinutes - bMinutes;
      }
      return aHours - bHours;
    });
  };

  return (
    <div
      className={`${styles.dayComponent} ${otherMonth ? styles.otherMonth : ""}  ${isExpanded ? styles.expanded : ""}`}
    >
      <div className={styles.dayIndex}>{day}</div>
      <div className={styles.classList}>
        {sortByTime(classList)
          .slice(0, isExpanded ? classList.length : 3)
          .map((item, index) => (
            <ClassItem key={index} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}

        {/* 수업이 3개 이상일 때만 확장/축소 버튼을 보여줌 */}
        {classList.length > 3 && (
          <button className={styles.toggleButton} onClick={toggleExpand}>
            <Icon iconname={isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"} size="16px" color="#000" />
          </button>
        )}
      </div>
    </div>
  );
}
