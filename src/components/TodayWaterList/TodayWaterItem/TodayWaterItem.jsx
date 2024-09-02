// TodayWaterItem.js
import { useState } from "react";
import css from "./todaywateritem.module.css";
import icons from "../../../assets/icons.svg";
import { AddWaterForm } from "../AddWaterListForm";

export const TodayWaterItem = ({ initialAmount, initialDate, onDelete }) => {
    const [amount, setAmount] = useState(initialAmount);
    const [date, setDate] = useState(initialDate);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const formatDate = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const updateWaterData = (newAmount, newDate) => {
        setAmount(newAmount);
        setDate(newDate);
    };

    const handleOpenDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDelete = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className={css.itemWrapper}>
                <div className={css.dateAmount}>
                    <svg className={css.glass}>
                        <use href={`${icons}#icon-glass`}></use>
                    </svg>
                    <div className={css.infoWrapper}>
                        <p className={css.amount}>
                            {amount === 0 ? "Drink some water" : `${amount}ml`}
                        </p>
                        <p className={css.date}>{formatDate(date)}</p>
                    </div>
                </div>
                <div className={css.svgWrapper}>
                    <button type="button" className={css.button} onClick={handleEditClick}>
                        <svg className={css.edit}>
                            <use href={`${icons}#icon-edit`}></use>
                        </svg>
                    </button>
                    <button type="button" className={css.button} onClick={handleOpenDelete}>
                        <svg className={css.delete}>
                            <use href={`${icons}#icon-delete`}></use>
                        </svg>
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div className={css.modalOverlay}>
                    <AddWaterForm
                        initialAmount={amount}
                        initialDate={date}
                        updateWaterData={updateWaterData}
                        onClose={handleModalClose}
                    />
                </div>
            )}

            {isDeleteModalOpen && (
                <div className={css.modalOverlay}>
                    <div className={css.modalDelete}>
                        <svg className={css.crossSvg} onClick={handleCloseDelete}>
                            <use href={`${icons}#icon-cross`}></use>
                        </svg>
                        <div className={css.deleteQuestion}>
                            <p className={css.deleteEntry}>Delete entry</p>
                            <p className={css.sure}>Are you sure you want to delete the entry?</p>
                        </div>
                        <div className={css.choiseBtns}>
                            <button onClick={handleCloseDelete}>Cancel</button>
                            <button onClick={onDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
