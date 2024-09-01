import { useState } from "react";
import icons from "../../assets/icons.svg";
import css from "./MonthStatsTable.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
// import responseFromFile from "../../daily-water.json";

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
  const [hoveredDay, setHoveredDay] = useState(null);

  const formatCurrentDay = (year, month, day) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  const currentHoveredDate = hoveredDay
    ? formatCurrentDay(year, month, hoveredDay)
    : null;

  // const dayData = responseFromFile.find(
  //   (data) => data.date === currentHoveredDate
  // );

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

  // const days = [];
  // for (let day = 1; day <= daysInMonth; day++) {
  //   // const dayPercentage = datePer === day ? `${dayData.percent}%` : "0%";

  //   days.push(
  //     <div key={day} className={css.day}>
  //       <span>{day}</span>
  //       {/* <span>{dayPercentage}</span> */}
  //     </div>
  //   );
  // }
  // ========================
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    // const dayPercentage = datePer === day ? `${dayData.percent}%` : "0%";
    return (
      <div key={day} className={css.day}>
        <span>{day}</span>
      </div>
    );
  });

  // ========================

  const handleOpenDayInfo = (day) => {
    setHoveredDay(day);
    setIsModalOpen(true);
  };

  const handleCloseDayInfo = () => {
    setIsModalOpen(false);
    setHoveredDay(null);
  };

  const dateInWord = () => {
    return `${hoveredDay}, ${monthsNames[month]}`;
  };

  const newDate = dateInWord();

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
          <div className={css.monthName}>
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
      <div className={css.daysWrapper}>
        <ul className={css.calendar}>
          {days.map((day) => (
            <li className={css.dayInCalendar} key={day.key}>
              <div
                className={css.dayItem}
                onClick={() => {
                  handleOpenDayInfo(day.key);
                }}
                onMouseLeave={handleCloseDayInfo}
              >
                {day.key}
              </div>
              {/* <div className={css.percentDayItem}>
                {dayData ? `${dayData.percent}%` : "0%"}
              </div> */}
            </li>
          ))}
        </ul>
        {isModalOpen && hoveredDay && (
          <div className={css.tableWrapper}>
            <div className={css.popUpWindow}>
              <DaysGeneralStats day={currentHoveredDate} dayInWord={newDate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
