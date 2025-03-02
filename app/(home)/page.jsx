"use client";
import Calendar from "./(components)/calendar";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {

const currentDate = new Date();
const year = currentDate.getFullYear(); // 현재 년도
const month = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줍니다)

  return (
    <>
      <div>수업 확인 페이지</div>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button>dropdown</button>
          <p>
            {year}년 {month}월
          </p>
          <button>수업추가</button>
        </div>
        <Calendar year={year} month={month} />
      </div>
    </>
  );
}
