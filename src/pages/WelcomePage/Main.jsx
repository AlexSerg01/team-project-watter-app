import css from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import WaterConsumptionTracker from "../../components/WelcomePage/WaterСonsumptionTracker/WaterСonsumptionTracker.jsx";
import WhyDrinkWater from "../../components/WelcomePage/WhyDrinkWater/WhyDrinkWater.jsx";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate("/signup");
  };
  return (
    <div className={css.welcome_page_backgr}>
      <div className={css.welcome_page_components}>
        <WaterConsumptionTracker onTryTrackerClick={handleTryTrackerClick} />
        <WhyDrinkWater />
      </div>
    </div>
  );
};
export default WelcomePage;
