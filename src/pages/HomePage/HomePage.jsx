import React from "react";
// import Header from "../../components/Header/Header";
// import DailyNorma from "../../components/DailyNorma/DailyNorma";
// import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
// import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
// import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

// import css from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <DailyNorma />
      </div>
      <div>
        <WaterRatioPanel />
      </div>
      <div>
        <TodayWaterList />
      </div>
      <div>
        <MonthStatsTable />
      </div>
    </div>
  );
};

export default HomePage;
