import { useState, useEffect } from "react";
import icons from "../../assets/icons.svg";
import css from "./MonthStatsTable.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
import { useDispatch, useSelector } from "react-redux";
import { fetchWaterInfo } from "../../redux/waterInfo/waterOperations.js";

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

  console.log(isModalOpen);

  const waterItems = useSelector((state) => state.waterInfo.items);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentDate = () => {
      return { month, year };
    };
    dispatch(fetchWaterInfo(currentDate));
  }, [dispatch, month, year]);

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

  const handleOpenDayInfo = (day) => {
    setHoveredDay(day);
    setIsModalOpen(true);
  };

  const handleCloseDayInfo = () => {
    setIsModalOpen(false);

    setHoveredDay(null);
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
          {waterItems.map((item) => (
            <li className={css.dayInCalendar} key={item.date}>
              <div
                className={
                  item.percentageConsumed !== "100%"
                    ? css.dayItemAccentColor
                    : css.dayItem
                }
                onClick={() => {
                  handleOpenDayInfo(item.date);
                }}
                onMouseLeave={handleCloseDayInfo}
              >
                {Number(item.date.split(",")[0])}
              </div>
              <div className={css.percentDayItem}>
                {item.percentageConsumed}
              </div>
            </li>
          ))}
        </ul>
        {isModalOpen && hoveredDay && (
          <div className={css.tableWrapper}>
            <div className={css.popUpWindow}>
              <DaysGeneralStats day={hoveredDay} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
