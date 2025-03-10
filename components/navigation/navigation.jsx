import Link from "next/link";
import styles from "./navigation.module.scss";

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <ul className={styles.listContainer}>
            <li className={styles.item}>
              <Link href="/login">로그인</Link>
            </li>
            <li className={styles.separator}></li>
            <li className={styles.item}>
              <Link href="/">수업 확인</Link>
            </li>
            <li className={styles.separator}></li>
            <li className={styles.item}>
              <Link href="/paymentHistory">급여내역</Link>
            </li>
            <li className={styles.separator}></li>
            <li className={styles.item}>
              <Link href="/modificationHistory">정정내역</Link>
            </li>
          </ul>
        </div>

        <button className={styles.button}>로그아웃</button>
      </nav>
    </header>
  );
};
export default Navigation;
