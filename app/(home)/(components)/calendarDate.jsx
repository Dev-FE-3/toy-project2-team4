import React, { useEffect, useState } from 'react';
import Day from "./day";
import styles from "./calendar.module.scss";
export default function CalendarDate({ currentDate }) {
 
  const daysInWeek = 7;
  const weeksInMonth = 5;

  return (
    <>
      <div className={styles.calendarDate}>
        {[...Array(weeksInMonth)].map((_, i) => (
        <div className={styles.calendarRow}>
          {[...Array(daysInWeek)].map((_, i) => (
            <Day key={i} dayIndex={i}/>
          ))}
        </div>
        ))}
      </div>
    </>
  );
}