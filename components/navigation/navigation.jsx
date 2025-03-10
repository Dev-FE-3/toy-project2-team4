import Link from "next/link";
import Button from "../common/button/button";
import styles from "./navigation.module.scss";

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* <div className={styles.navContainer}> */}
        <ul className={styles.listContainer}>
          <li className={styles.item}>
            <Link href="/login">로그인</Link>
          </li>
          <li className={styles.item}>
            <Link href="/">수업 확인</Link>
          </li>
          <li className={styles.item}>
            <Link href="/paymentHistory">급여내역</Link>
          </li>
          <li className={styles.item}>
            <Link href="/modificationHistory">정정내역</Link>
          </li>
        </ul>
        {/* </div> */}
        <Button>로그아웃</Button>
      </nav>
    </header>
  );
};
export default Navigation;
