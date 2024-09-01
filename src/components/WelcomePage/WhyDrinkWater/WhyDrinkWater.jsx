import css from "./WhyDrinkWater.module.css";

const WhyDrinkWater = () => {
  return (
    <section className={css.whyDrinkWater}>
      <h3 className={css.title}>Why drink water</h3>
      <ul className={css.list}>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Supply of nutrients to all organs</div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Providing oxygen to the lungs</div>
        </li>
        <li className={css.list_item}>
          <div className={css.disc}></div>
          <div className={css.item_text}>Maintaining the work of the heart</div>
        </li>
        <li className={css.list_item}>
          {" "}
          <div className={css.disc}></div>
          <div className={css.item_text}>Release of processed substances</div>
        </li>
        <li className={css.list_item}>
          {" "}
          <div className={css.disc}></div>
          <div className={css.item_text}>
            Ensuring the stability of the internal environment
          </div>
        </li>
        <li className={css.list_item}>
          {" "}
          <div className={css.disc}></div>
          <div className={css.item_text}>
            Maintaining within the normal temperature
          </div>
        </li>
        <li className={css.list_item}>
          {" "}
          <div className={css.disc}></div>
          <div className={css.item_text}>
            Maintaining an immune system capable of resisting disease
          </div>
        </li>
      </ul>
    </section>
  );
};

export default WhyDrinkWater;
