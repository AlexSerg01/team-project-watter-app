import { useDispatch } from 'react-redux';
import { updateDailyWaterIntake } from '../../redux/dailyNorma/operations';
import css from './DailyNormaModal.module.css';
import { useEffect, useState } from "react";
import { closeModal, updateNorma } from '../../redux/dailyNorma/slice';

const DailyNormaModal = () => {
  const [gender, setGender] = useState("woman");
  const [weight, setWeight] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [recommendedNorma, setRecommendedNorma] = useState(0);
  const [userNorma, setUserNorma] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const onClose = () => { dispatch(closeModal()); };

  const onConfirm = (newNorma) => {
    dispatch(updateNorma(newNorma));
    dispatch(closeModal());
  };

 
  useEffect(() => {
    const calculateNorma = () => {
    const weightNum = parseFloat(weight) || 0;
    const activityTimeNum = parseFloat(activityTime) || 0;
    let calculatedNorma = 0;

    if (gender === "man") {
      calculatedNorma = weightNum * 0.04 + activityTimeNum * 0.6;
    } else {
      calculatedNorma = weightNum * 0.03 + activityTimeNum * 0.4;
    }
    setRecommendedNorma(calculatedNorma.toFixed(1));
     };
    
    calculateNorma();
  }, [gender, weight, activityTime]);

  const handleSaveClick = () => {
    setUserNorma(userNorma);
    const newIntake = Number(userNorma) * 1000;

    const data = {
      dailyWaterIntake: String(newIntake)
    };

    dispatch(updateDailyWaterIntake(data))
      .unwrap()
      .then(() => {
        onConfirm(userNorma);
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update daily water intake: ", error);
        setError("Failed to update daily water intake. Please try again."); // Встановлюємо повідомлення про помилку
      });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {

    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button className={css.modalCloseButton} onClick={onClose} type='button'>
          <svg className={css.closeSvg} width="14" height="14" aria-label='close button'>
            <use href="/src/assets/icons.svg#icon-cross"></use>
          </svg>
        </button>
        <h2 className={css.title}>My daily norma</h2>
        <div>
          <div className={css.formulas}>
            <p className={css.formula}>For girl: <span className={css.blue}>V=(M*0,03) + (T*0,4)</span></p>
            <p className={css.formula}>For man: <span className={css.blue}>V=(M*0,04) + (T*0,6)</span> </p>
          </div>
          <p className={css.note}>
            <span className={css.dot}>*</span> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
          </p>
        </div>
        <h3 className={css.titleh3}>Calculate your rate:</h3>
        <div className={css.radio}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="woman"
              checked={gender === "woman"}
              onChange={() => setGender("woman")}
            />
            For woman
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="man"
              checked={gender === "man"}
              onChange={() => setGender("man")}
            />
            For man
          </label>
        </div>
        <div>
          <label className={css.titleInput}>Your weight in kilograms:</label>
          <input
            className={css.calcInput}
            type="number"
            value={weight}
            placeholder="0"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label className={css.titleInput}>
            The time of active participation in sports or other activities with a high physical load in hours:
          </label>
          <input
            className={css.calcInput}
            type="number"
            value={activityTime}
            placeholder="0"
            min='0'
            max='24'
            onChange={(e) => setActivityTime(e.target.value)}
            onInput={(e) => {
    if (e.target.value > 24) {
      e.target.value = 24;
    } else if (e.target.value < 0) {
      e.target.value = 0;
    }}}
          />
        </div>
        <div>
          <div className={css.result}>
            <p className={css.total}>The required amount of water in liters per day:</p>
            <strong className={css.screen}>{recommendedNorma} L</strong>
          </div>
        </div>
        <div>
          <label className={css.resultTitle}>Write down how much water you will drink:</label>
          <input className={css.calcInput}
            type="number"
            placeholder="0"
            value={userNorma}
            onChange={(e) => setUserNorma(e.target.value)}/>
        </div>
        {error && <div className={css.errorMessage}>{'The maximum allowable water intake is 15 liters per day. Please enter valid values within this limit.'}</div>}
        <button className={css.saveBtn} onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default DailyNormaModal;