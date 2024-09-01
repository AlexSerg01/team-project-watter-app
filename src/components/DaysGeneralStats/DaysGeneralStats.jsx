import css from "./DaysGeneralStats.module.css";
import responseFromFile from "../../daily-water.json";

export default function DaysGeneralStats() {
  return (
    <div>
      <ul className={css.dayStatus}>
        <li className={css.dayStatusItem}>{responseFromFile[0].date}</li>
        <li className={css.dayStatusItem}>
          Daily norma: {responseFromFile[0].daily_norma}
        </li>
        <li className={css.dayStatusItem}>
          Fulfillment of the daily norm: {responseFromFile[0].percent}
        </li>
        <li className={css.dayStatusItem}>
          How many servings of water: {responseFromFile[0].quantity}
        </li>
      </ul>
    </div>
  );
}
