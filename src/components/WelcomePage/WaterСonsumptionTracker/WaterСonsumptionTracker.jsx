import css from "./WaterConsumptionTracker.module.css";

const WaterConsumptionTracker = ({ onTryTrackerClick }) => {
  return (
    <section className={css.water_consumption_tracker}>
      <h1 className={css.title}>Water consumption tracker</h1>
      <h2 className={css.title_record}>Record daily water intake and track</h2>
      <h3 className={css.title_list}>Tracker Benefits</h3>
      <ul className={css.tracker_benefits}>
        <li className={css.benefit_item}>
          <svg className={css.icon_svg} width="32" height="32">
            <use href="/src/assets/icons.svg#icon-calendar-days"></use>
          </svg>
          <p className={css.benefit_discrip}>Habit drive</p>
        </li>
        <li className={css.benefit_item}>
          <svg className={css.icon_svg} width="32" height="32">
            <use href="/src/assets/icons.svg#icon-presentation-bar"></use>
          </svg>
          <p className={css.benefit_discrip}>View statistics</p>
        </li>
        <li className={css.benefit_item}>
          <svg className={css.icon_svg} width="32" height="32">
            <use href="/src/assets/icons.svg#icon-wrench-screwdriver"></use>
          </svg>
          <p className={css.benefit_discrip}>Personal rate setting</p>
        </li>
      </ul>
      <button className={css.button} onClick={onTryTrackerClick}>
        Try tracker
      </button>
    </section>
  );
};

export default WaterConsumptionTracker;
