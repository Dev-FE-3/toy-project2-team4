"use client"
import Calendar from "./(components)/calendar";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <>
      <div>수업 확인 페이지</div>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>📅 Calendar (2025.02)</div>
        <Calendar currentDate={currentDate} />
      </div>
    </>
  );
}
