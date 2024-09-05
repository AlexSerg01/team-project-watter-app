import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList";
// import DailyNorma from "../../components/DaiilyNorma/DailyNorma";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel";

import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

import css from "./HomePage.module.css";
import { AddWaterForm } from "../../components/WaterRatioPanel/AddWaterForm";
import { useState } from "react";

const HomePage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  function openAddNewWaterRecordModalHandler() {
    setIsOpen(true);
  }

  return (
    <div className={css.homeMain}>
      <div className={css.homeContainer}>
        <div className={css.dailyBox}>{/* <DailyNorma /> */}</div>
        <div className={css.homeBotle}></div>
        <div className={css.waterRatioPanel}>
          <WaterRatioPanel
            openAddNewWaterRecordModalHandler={
              openAddNewWaterRecordModalHandler
            }
          />
        </div>
        <div className={css.tableWrapper}>
          <TodayWaterList
            openAddNewWaterRecordModalHandler={
              openAddNewWaterRecordModalHandler
            }
          />
          <MonthStatsTable />
        </div>
        {modalIsOpen && (
          <AddWaterForm
            onClose={closeModal}
            initialAmount={0}
            initialDate={new Date()}
            updateWaterData={(amount, date) => {
              console.log("Amount:", amount);
              console.log("Date:", date);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
