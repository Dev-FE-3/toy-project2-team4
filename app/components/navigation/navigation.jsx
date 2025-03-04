import Link from "next/link";
import styles from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/login">로그인</Link>
        </li>
        <li className={styles.item}>
          <Link href="/">수업 확인</Link>
        </li>
        <li className={styles.item}>
          <Link href="/paymentHistory">급여내역 확인</Link>
        </li>
        <li className={styles.item}>
          <Link href="/modificationHistory">정정내역 확인</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
