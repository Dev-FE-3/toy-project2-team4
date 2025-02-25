import Link from "next/link";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - 페이지를 찾을 수 없습니다</h1>
      <p className={styles.message}>요청하신 페이지가 존재하지 않습니다.</p>
      <Link href="/" style={styles.button}>
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
