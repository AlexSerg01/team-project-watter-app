import { useState, useEffect } from "react";
import { TodayWaterItem } from "./TodayWaterItem/TodayWaterItem";
import css from "./addwaterlist.module.css";
import icons from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWaterRecord,
  getAllWaterRecordsPerDay,
} from "../../redux/water/waterOperations";
import { selectWaterRecords } from "../../redux/water/waterSelectors";
import { EditWaterForm } from "./EditWaterForm";
import { nanoid } from "nanoid";

export const TodayWaterList = ({ openAddNewWaterRecordModalHandler }) => {
  const dispatch = useDispatch();

  const waterRecords = useSelector(selectWaterRecords);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    dispatch(getAllWaterRecordsPerDay());
  }, [dispatch]);


  const handleEditModalClose = () => {
    setEditingRecord(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteWaterRecord(id))
      .unwrap()
      .then(() => {
        console.log("Water record deleted:", id);
      })
      .catch((error) => {
        console.error("Failed to delete water record:", error);
      });
  };

  return (
    <div className={css.section}>
      <div className={css.todayWrapper}>
        <p className={css.today}>Today</p>
        <div className={css.listContainer}>
          <div className={css.hightRegulator}>
            <ul className={css.listWraper}>
              {waterRecords.map((elem) => (
                <li key={nanoid()}>
                  <TodayWaterItem
                    amount={elem.amount}
                    date={elem.time}
                    onDelete={() => handleDelete(elem._id)}
                    onEdit={() => setEditingRecord(elem)}
                  />
                </li>
              ))}
            </ul>
              <button
                className={css.addBtn}
                onClick={openAddNewWaterRecordModalHandler}
              >
                <svg>
                  <use href={`${icons}#icon-increment`}></use>
                </svg>
                <span>Add water</span>
              </button>
          </div>
        </div>
      </div>
      {editingRecord && (
        <div className={css.modalBackdrop}>
          <EditWaterForm
            onClose={handleEditModalClose}
            editingRecord={editingRecord}
          />
        </div>
      )}
    </div>
  );
};
