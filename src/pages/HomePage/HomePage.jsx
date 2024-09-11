import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList";
import { WaterRatioPanel } from "../../components/WaterRatioPanel/WaterRatioPanel";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import MyDailyNorma from "../../components/MyDailyNorma/MyDailyNorma";
import { AddWaterForm } from "../../components/WaterRatioPanel/AddWaterForm";
import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/user/operations";

const HomePage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  function openAddNewWaterRecordModalHandler() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className={css.homeContainer}>
        <div className={css.dailyBox}>
          <MyDailyNorma />
        </div>
        <div className={css.homeBottle}></div>
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
            initialAmount={''}
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
