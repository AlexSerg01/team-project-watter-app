import { useState } from "react";

import icons from "../../assets/icons.svg";
import css from "./MonthStatsTable.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";

import responseFromFile from "../../daily-water.json";

export default function MonthStatsTable() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const nextMonth = () => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth + 1;
      let newYear = year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      if (
        newYear > currentYear ||
        (newYear === currentYear && newMonth > currentMonth)
      ) {
        return prevMonth;
      }

      setYear(newYear);
      return newMonth;
    });
  };

  const prevMonth = () => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth - 1;
      let newYear = year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      setYear(newYear);
      return newMonth;
    });
  };

  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div key={day} className={css.day}>
        {day}
      </div>
    );
  }

  const handleOpenDayInfo = (day) => {
    setIsModalOpen(true);
    console.log(`hover on day, ${day}`);
  };

  const handleCloseDayInfo = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.calendarWrapper}>
      <div className={css.monthHeader}>
        <p className={css.monthTitle}>Month</p>
        <div className={css.calendarNavi}>
          <button className={css.chevronBtn} onClick={prevMonth}>
            <svg className={css.chevronBtnIcon}>
              <use href={`${icons}#icon-chevron-left`}></use>
            </svg>
          </button>
          <div>
            {monthsNames[month]}, {year}
          </div>

          <button
            onClick={nextMonth}
            className={
              month === currentMonth && year === currentYear
                ? css.chevronBtnHidden
                : css.chevronBtn
            }
          >
            <svg className={css.chevronBtnIcon}>
              <use href={`${icons}#icon-chevron-right`}></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className={css.calendar}>
        {days.map((day) => (
          <li
            className={css.dayInCalendar}
            key={day.key}
            onMouseEnter={() => {
              handleOpenDayInfo(day.key);
            }}
            onMouseLeave={handleCloseDayInfo}
          >
            <div className={css.dayItem}>{day.key}</div>
            <div className={css.percentDayItem}>
              {responseFromFile[0].percent}%
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className={css.popUpWindow}>
          <DaysGeneralStats />
        </div>
      )}
    </div>
  );
}
