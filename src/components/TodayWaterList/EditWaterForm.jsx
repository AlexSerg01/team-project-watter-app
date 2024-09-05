import { useState } from "react";
import css from "./addwaterlist.module.css";
import icons from "../../assets/icons.svg";
import { useDispatch } from "react-redux";
import { updateWaterRecord } from "../../redux/water/waterOperations";

export const EditWaterForm = ({
  onClose,
  editingRecord
}) => {
  const [amount, setAmount] = useState(editingRecord.amount);
  const [date, setDate] = useState(editingRecord.date);

  const dispatch = useDispatch();

  const formatTimeForInput = (date) => {
    let hours =  new Date(date).getHours();
    let minutes =  new Date(date).getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  };

  console.log('dat',date)
  const formatDate = (date) => {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    return `${hours}:${minutes}`;
  };
    
    const handleDec = () => {
    setAmount((prev) => (prev > 50 ? prev - 50 : 0));
  };

  const handleInc = () => {
    setAmount(amount + 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Отримуємо значення поля amount
    const formAmount = Number(e.target.elements.amount.value);

    dispatch(updateWaterRecord({ id: editingRecord._id, amount: formAmount }))
      .unwrap()
      .then(() => {
        console.log("Water record updated:", formAmount);
      })
      .catch((error) => {
        console.error("Failed to update water record:", error);
      });

    if (typeof onClose === "function") {
      onClose();
    } else {
      console.error("onClose is not a function");
    }
  };


  return (
    <form className={css.section} onSubmit={handleSubmit}>
      <p className={css.sectionHeader}>Edit the entered amount of water</p>
      <button className={css.crossBtn} type="button" onClick={onClose}>
        <svg>
          <use href={`${icons}#icon-cross`}></use>
        </svg>
      </button>
      <div className={css.formEditInfo}>
        <div className={css.waterPreInfo}>
          <svg className={css.svgGlass}>
            <use href={`${icons}#icon-glass`}></use>
          </svg>
          <div className={css.timeAmount}>
            <span className={css.waterAmount}>{amount} ml</span>
            <span className={css.spanTime}>{formatDate(date)}</span>
          </div>
        </div>
        <div className={css.amountCorrection}>
          <p className={css.enteredData}>Correct entered data:</p>
          <p>Amount of water:</p>
          <div className={css.amountCalc}>
            <button
              type="button"
              className={css.amountBtnDec}
              onClick={handleDec}
              disabled={amount === 0}
            >
              <svg>
                <use href={`${icons}#icon-decrement`}></use>
              </svg>
            </button>
            <p className={css.spanAmount}>{amount} ml</p>
            <button
              type="button"
              className={css.amountBtnInc}
              onClick={handleInc}
              disabled={amount === 5000}
            >
              <svg>
                <use href={`${icons}#icon-increment`}></use>
              </svg>
            </button>
          </div>
          <div className={css.inputWrapper}>
            <p>Recording time:</p>
            <input
              type="time"
              value={formatTimeForInput(date)}
              onChange={handleTimeChange}
            />
          </div>
          <div className={css.inputWrapper}>
            <p className={css.numberTopic}>
              Enter the value of the water used:
            </p>
            <input
              type="number"
              name='amount'
              min={0}
              max={5000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className={css.saveBtnWrapper}>
        <div className={css.finalAmountSave}>
          <p>{amount === 0 ? "" : `${amount} ml`}</p>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};
