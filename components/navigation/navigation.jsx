"use client";

import Link from "next/link";
import Button from "../common/button/button";
import styles from "./navigation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authReducer";
import { auth } from "../../utils/firebase";

const Navigation = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logout());
    auth.signOut();
    // localStorage.removeItem("userInfo");
  };

  if (!userInfo) return null;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* <div className={styles.navContainer}> */}
        <ul className={styles.listContainer}>
          <li className={styles.item}>
            <Link href="/">수업 확인</Link>
          </li>
          {userInfo.role === "admin" ? (
            <></>
          ) : (
            <>
              <li className={styles.item}>
                <Link href="/paymentHistory">급여내역</Link>
              </li>
              <li className={styles.item}>
                <Link href="/modificationHistory">정정내역</Link>
              </li>
            </>
          )}
        </ul>
        <span>안녕하세요? {userInfo?.name}님!</span>
        {/* </div> */}
        <Button onClick={logOut}>로그아웃</Button>
      </nav>
    </header>
  );
};
export default Navigation;
