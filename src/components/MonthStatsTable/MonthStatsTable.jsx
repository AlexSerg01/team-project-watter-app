import { useState } from "react";

import icons from "../../assets/icons.svg";
import css from "./MonthStatsTable.module.css";

export default function MonthStatsTable() {
  useState();

  const handleClick = (month) => {
    console.log(month);
  };

  return (
    <div className={css.monthWrapper}>
      <div className={css.monthHeader}>
        <h1>Month</h1>
        <button onClick={() => handleClick("Previouse month")}>
          <svg>
            <use href={`${icons}#icon-chevron-left-btn`}></use>
          </svg>
        </button>
        <p>Month name</p>
        <button onClick={() => handleClick("Next month")}>
          <svg>
            <use href={`${icons}#icon-chevron-right-btn`}></use>
          </svg>
        </button>
      </div>
      <p>Тут має бути календар</p>
    </div>
  );
}
