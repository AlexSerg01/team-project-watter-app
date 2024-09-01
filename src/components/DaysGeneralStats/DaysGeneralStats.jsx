import css from "./DaysGeneralStats.module.css";
import responseFromFile from "../../daily-water.json";

export default function DaysGeneralStats({ day, dayInWord }) {
  const dayData = responseFromFile.find((data) => data.date === day);

  if (!dayData) {
    return (
      <div className={css.dayStatusWrapper}>
        <ul className={css.dayStatus}>
          <li className={css.dayStatusDate}>{dayInWord}</li>
          <li className={css.dayStatusItem}>
            Daily norma: <span className={css.textColorAccent}>1.5L</span>
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
        <li className={css.dayStatusDate}>{dayInWord}</li>
        <li className={css.dayStatusItem}>
          Daily norma:{" "}
          <span className={css.textColorAccent}>{dayData.daily_norma}ml</span>
        </li>
        <li className={css.dayStatusItem}>
          Fulfillment of the daily norm:{" "}
          <span className={css.textColorAccent}>{dayData.percent}%</span>
        </li>
        <li className={css.dayStatusItem}>
          How many servings of water:{" "}
          <span className={css.textColorAccent}>{dayData.quantity}</span>
        </li>
      </ul>
    </div>
  );
}
