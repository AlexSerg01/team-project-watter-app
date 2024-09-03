import { useState } from "react";
import css from "../TodayWaterList/addwaterlist.module.css";
import icons from "../../assets/icons.svg";

export const AddWaterForm = ({
    onClose,
    initialAmount,
    initialDate,
    updateWaterData,
}) => {
    const [amount, setAmount] = useState(initialAmount);
    const [date, setDate] = useState(initialDate);

    const formatTimeForInput = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
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


    const handleDec = () => {
        setAmount((prev) => (prev > 50 ? prev - 50 : 0));
    };

    const handleInc = () => {
        setAmount(amount + 50);
    };

    const handleChange = (e) => {
        setAmount(Number(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof updateWaterData === "function") {
            updateWaterData(amount, date);
        } else {
            console.error("updateWaterData is not a function");
        }
        if (typeof onClose === "function") {
            onClose();
        } else {
            console.error("onClose is not a function");
        }
    };

    return (
        <form className={css.section} onSubmit={handleSubmit}>
            <p className={css.sectionHeader}>Add water</p>
            <button className={css.crossBtn} type="button" onClick={onClose}>
                <svg>
                    <use href={`${icons}#icon-cross`}></use>
                </svg>
            </button>
            <div className={css.formEditInfo}>
                <div className={css.amountCorrection}>
                    <p className={css.enteredData}>Choose a value:</p>
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
                            value={amount}
                            onChange={handleChange}
                            min={0}
                            max={5000}
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


