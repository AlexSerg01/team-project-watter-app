import css from "./Main.module.css";

import WaterConsumptionTracker from "../../components/WelcomePage/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx";
import WhyDrinkWater from "../../components/WelcomePage/WhyDrinkWater/WhyDrinkWater.jsx";

const WelcomePage = () => {
  return (
    <div className={css.welcomePage}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};
export default WelcomePage;
