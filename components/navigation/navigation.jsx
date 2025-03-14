"use client";

import Link from "next/link";
import Button from "../common/button/button";
import styles from "./navigation.module.scss";
import Icon from "../common/icon/icon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authReducer";
import { auth } from "../../utils/firebase";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const userInfo = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logout());
    auth.signOut();
  };

  if (!userInfo) return;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.listContainer}>
          <li className={styles.item}>
            <img src="/images/title-logo.svg" alt="" />
          </li>
          <li className={`${styles.item} ${pathname === "/" ? styles.isvisitted : ""}`}>
            <Link href="/">수업 확인</Link>
          </li>
          {userInfo.role === "admin" ? (
            <></>
          ) : (
            <>
              <li className={`${styles.item} ${pathname === "/paymentHistory" ? styles.isvisitted : ""}`}>
                <Link href="/paymentHistory">급여내역</Link>
              </li>
              <li className={`${styles.item} ${pathname === "/modificationHistory" ? styles.isvisitted : ""}`}>
                <Link href="/modificationHistory">정정내역</Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.rightContainer}>
          <span>안녕하세요. {userInfo?.name}님</span>
          <Icon iconname="account_circle" size="3.5rem"></Icon>
          <Button onClick={logOut} className={styles.logoutButton}>
            로그아웃
          </Button>
        </div>
      </nav>
    </header>
  );
};
export default Navigation;
