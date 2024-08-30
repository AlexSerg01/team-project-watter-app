import css from "./WaterConsumptionTracker.module.css";

const WaterConsumptionTracker = ({ onTryTrackerClick }) => {
  return (
    <section className={css.waterConsumptionTracker}>
      <h1>Water consumption tracker</h1>
      <h2>Record daily water intake and track</h2>
      <h3>Tracker Benefits</h3>
      <div className={css.trackerBenefits}>
        <div className={css.benefitItem}>
          <img src="/path/to/habit-drive-icon.png" alt="Habit drive" />
          <p>Habit drive</p>
        </div>
        <div className={css.benefitItem}>
          <img src="/path/to/view-statistics-icon.png" alt="View statistics" />
          <p>View statistics</p>
        </div>
        <div className={css.benefitItem}>
          <img
            src="/path/to/personal-rate-icon.png"
            alt="Personal rate setting"
          />
          <p>Personal rate setting</p>
        </div>
      </div>
      <button onClick={onTryTrackerClick}>Try tracker</button>
    </section>
  );
};

export default WaterConsumptionTracker;
