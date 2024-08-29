import { useState } from "react";
import css from "./addwaterlist.module.css";
import icons from "../../assets/icons.svg";

export const AddWaterForm = ({ onClose, initialAmount, initialDate, updateWaterData }) => {
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

    const formatDate = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        return hours + ':' + minutes;
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
        updateWaterData(amount, date);
        onClose(); 
    };

    return (
        <form className={css.section} onSubmit={handleSubmit}>
            <p className={css.sectionHeader}>Edit the entered amount of water</p>
            <button className={css.crossBtn}>
                <svg onClick={onClose}>
                    <use href={`${icons}#icon-cross`}></use>
                </svg>
            </button>
            <div className={css.formEditInfo}>
                <div className={css.waterPreInfo}>
                    <svg className={css.svgGlass}>
                        <use href={`${icons}#icon-glass`}></use>
                    </svg>
                    <div className={css.timeAmount}>
                        <span className={css.waterAmount}>{initialAmount} ml</span>
                        <span className={css.spanTime}>{formatDate(date)}</span>
                    </div>
                </div>
                <div className={css.amountCorrection}>
                    <p className={css.enteredData}>Correct entered data:</p>
                    <p>Amount of water:</p>
                    <div className={css.amountCalc}>
                        <button type="button" className={css.amountBtnDec} onClick={handleDec} disabled={amount === 0}>
                            <svg>
                                <use href={`${icons}#icon-decrement`}></use>
                            </svg>
                        </button>
                        <p className={css.spanAmount}>{amount} ml</p>
                        <button type="button" className={css.amountBtnInc} onClick={handleInc} disabled={amount === 5000}>
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
                        <p>Enter the value of the water used:</p>
                        <input type="number"
                            value={amount}
                            onChange={handleChange}
                            min={0}
                        max={5000}/>
                    </div>
                </div>
            </div>
            <div className={css.saveBtnWrapper}>
                <div className={css.finalAmountSave}>
                    <p>{amount === 0 ? "" : amount + ' ml'}</p>
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
};
