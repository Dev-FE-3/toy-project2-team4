import styles from "../page.module.scss";
import { classColors } from "../classColors";
export default function ClassItem({ index, item }) {
  const color = classColors[item.title] || "#E0E0E0"; // 없으면 기본 회색
  const backgroundColor = `${color}33`; // HEX 뒤에 "33" 추가 → 약 20% 투명도 (RGBA로 변환됨)
  return (
    <div
      key={index}
      className={styles.classItem}
      style={{
        borderColor: color, // 선명한 색
        backgroundColor: backgroundColor, // 반투명 배경
      }}
    >
      {item.title}
    </div>
  );
}
