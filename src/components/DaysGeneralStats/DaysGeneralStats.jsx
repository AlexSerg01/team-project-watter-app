import css from "./DaysGeneralStats.module.css";
import { useSelector } from "react-redux";

export default function DaysGeneralStats({ day }) {
  const waterItems = useSelector((state) => state.water.items);

  const dayData = waterItems.find((data) => data.date === day);

  if (!waterItems) {
    return (
      <div className={css.dayStatusWrapper}>
        <ul className={css.dayStatus}>
          <li className={css.dayStatusDate}>{day}</li>
          <li className={css.dayStatusItem}>
            Daily norma: <span className={css.textColorAccent}>2L</span>
          </li>
          <li className={css.dayStatusItem}>
            Fulfillment of the daily norm:{" "}
            <span className={css.textColorAccent}>0%</span>
          </li>
          <li className={css.dayStatusItem}>
            How many servings of water:{" "}
            <span className={css.textColorAccent}>0</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={css.dayStatusWrapper}>
      <ul className={css.dayStatus}>
        <li className={css.dayStatusDate}>{day}</li>
        <li className={css.dayStatusItem}>
          Daily norma:{" "}
          <span className={css.textColorAccent}>{dayData.dailyNorm}</span>
        </li>
        <li className={css.dayStatusItem}>
          Fulfillment of the daily norm:{" "}
          <span className={css.textColorAccent}>
            {dayData.percentageConsumed}
          </span>
        </li>
        <li className={css.dayStatusItem}>
          How many servings of water:{" "}
          <span className={css.textColorAccent}>{dayData.entries}</span>
        </li>
      </ul>
    </div>
  );
}
