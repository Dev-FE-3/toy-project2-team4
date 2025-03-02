import React, { useEffect, useState } from "react";
import Day from "./day";
import styles from "../page.module.scss";
export default function CalendarDate({ year, month }) {
  const daysInWeek = 7;
  const weeksInMonth = getWeeksInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const totalDays = getTotalDays(year, month);

  return (
    <>
      <div className={styles.calendarDate}>
        {Array.from({ length: weeksInMonth }).map((_, week) => (
          <div key={week} className={styles.calendarRow}>
            {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
              let day = week * 7 + dayIndex - firstDayOfMonth + 1; // 날짜 인덱스 계산
              let todayMonth = month;
              if (day > totalDays) {
                day -= totalDays;
                todayMonth++;
              } else if (day <= 0) {
                todayMonth--;
                const totalDays = getTotalDays(year, todayMonth);
                day = totalDays + day;
              }
              const otherMonth = todayMonth !== month;

              const classList = getClassListForDay(todayMonth, day);
              return (
                <Day
                  key={`${week}-${dayIndex}`}
                  otherMonth={otherMonth}
                  month={todayMonth}
                  dayIndex={dayIndex}
                  day={day}
                  classList={classList}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );

  function getWeeksInMonth(year, month) {
    // 이번 달의 첫째 날과 마지막 날 구하기
    const firstDay = getFirstDayOfMonth(year, month);
    // 이번 달의 총 날짜 수
    const totalDays = getTotalDays(year, month);

    // (첫째 날 이전의 빈 칸 + 이번 달 날짜 수) ÷ 7 을 올림 처리
    return Math.ceil((firstDay + totalDays) / 7);
  }

  function getFirstDayOfMonth(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    // 첫째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    let firstDayOfWeek = firstDay.getDay();
    // 첫째 날의 요일 (0: 월요일, 1: 화요일, ..., 6: 일요일)
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    return firstDayOfWeek;
  }

  function getTotalDays(year, month) {
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();
    return totalDays;
  }

  // 주어진 날짜에 해당하는 수업을 반환하는 함수
  function getClassListForDay(todayMonth, day) {
    const classes = [
      {
        date: "2025-03-02",
        lessons: [{ instructor: "장은혜", title: "React", startTime: "10:00", endTime: "12:00" }],
      },
      {
        date: "2025-03-01",
        lessons: [
          { instructor: "표현경", title: "CSS", startTime: "09:00", endTime: "11:00" },
          { instructor: "양정규", title: "C++", startTime: "10:00", endTime: "11:00" },
        ],
      },
      {
        date: "2025-03-01",
        lessons: [{ instructor: "양정규", title: "C++", startTime: "10:00", endTime: "11:00" }],
      },
      {
        date: "2025-04-01",
        lessons: [{ instructor: "박현수", title: "JavaScript", startTime: "14:00", endTime: "16:00" }],
      },
      // 추가 수업 데이터
    ];
    const formattedDate = `${year}-${String(todayMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayClass = classes.find((classData) => classData.date === formattedDate);
    return dayClass ? dayClass.lessons : [];
  }
}
