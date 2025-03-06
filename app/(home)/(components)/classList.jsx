import styles from "../page.module.scss";
import ClassItem from "./classItem";
import Icon from "../../../components/common/icon/icon";
import { useState } from "react";

export default function ClassList({ classList, isExpanded, toggleExpand, onEdit, onDelete, isAdmin }) {

  // 유틸리티 함수
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

  // 렌더링
  return (
    <div className={styles.classList}>
      {sortByTime(classList)
        .slice(0, isExpanded ? classList.length : 3)
        .map((item, index) => (
          <ClassItem key={index} item={item} onEdit={onEdit} onDelete={onDelete} isAdmin={isAdmin}/>
        ))}

      {/* 수업이 3개 이상일 때만 확장/축소 버튼을 보여줌 */}
      {classList.length > 3 && (
        <button className={styles.toggleButton} onClick={toggleExpand}>
          <Icon iconname={isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"} size="16px" color="#000" />
        </button>
      )}
    </div>
  );
}
