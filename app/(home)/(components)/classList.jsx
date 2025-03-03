import styles from "../page.module.scss";
import ClassItem from "./classItem";
import Icon from "../../../components/common/icon/icon";
export default function ClassList({ classList, isExpanded, toggleExpand }) {
  return (
    <div className={styles.classList}>
      {sortByTime(classList).slice(0, isExpanded ? classList.length : 3).map((item, index) => (
        <>
          <ClassItem item={item} /> {/* 개별 수업을 렌더링하는 컴포넌트 */}
        </>
      ))}

      {/* 수업이 3개 이상일 때만 확장/축소 버튼을 보여줌 */}
      {classList .length > 3 && (
        <button className={styles.toggleButton} onClick={toggleExpand}>
          <Icon iconname={isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"} size="16px" color="#000" />
        </button>
      )}
    </div>
  );

  // 시간순으로 정렬하는 함수
function sortByTime(classList) {
  return classList.sort((a, b) => {
    // 시간 비교 (startTime이 "HH:mm" 형식이라면)
    const [aHours, aMinutes] = a.startTime.split(":").map(Number);
    const [bHours, bMinutes] = b.startTime.split(":").map(Number);

    // 시간을 비교하여 정렬
    if (aHours === bHours) {
      return aMinutes - bMinutes; // 분을 기준으로 정렬
    }
    return aHours - bHours; // 시간을 기준으로 정렬
  });
};
}
