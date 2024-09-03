import { TodayWaterList } from "../../components/TodayWaterList/TodayWaterList";
// import Header from "../../components/Header/Header";
// import DailyNorma from "../../components/DaiilyNorma/DailyNorma";
// import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

import css from "./HomePage.module.css";
import MyDailyNorma from "../../components/MyDailyNorma/MyDailyNorma";

const HomePage = () => {
  return (
    <div className={css.homeMain}>
      <div>{/* <Header /> */}</div>
      <div className={css.homeContainer}>
        <MyDailyNorma/>
        <div className={css.homeBotle}></div>
        <div className={css.waterRatioPanel}>{/* <WaterRatioPanel /> */}</div>
        <div className={css.tableWrapper}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
