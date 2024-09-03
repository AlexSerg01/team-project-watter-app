import { useState, useEffect } from "react";
import { TodayWaterItem } from "./TodayWaterItem/TodayWaterItem";
import css from "./addwaterlist.module.css";
import icons from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { addWaterRecord, deleteWaterRecord, updateWaterRecord } from "../../redux/water/waterOperations";
import { selectWaterRecords } from "../../redux/water/waterSelectors";
import { EditWaterForm } from "./AddWaterListForm";

export const TodayWaterList = () => {
  const dispatch = useDispatch();

  const waterRecords = useSelector(selectWaterRecords);
  const [waterItems, setWaterItems] = useState(waterRecords);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    setWaterItems(waterRecords);
  }, [waterRecords]);

  const handleAddWater = () => {
    const newWaterItem = {
      amount: 250,
    };

    dispatch(addWaterRecord(newWaterItem))
      .unwrap()
      .then((response) => {
        console.log("New water record added:", response);
      })
      .catch((error) => {
        console.error("Failed to add water record:", error);
      });
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

  const handleUpdate = (id, amount, date) => {
    dispatch(updateWaterRecord({ id, amount, date }))
      .unwrap()
      .then(() => {
        console.log("Water record updated:", id);
      })
      .catch((error) => {
        console.error("Failed to update water record:", error);
      });
  };

  return (
    <div className={css.tableWrapper}>
      <div className={css.todayWrapper}>
        <p className={css.today}>Today</p>
        <div className={css.listContainer}>
          <div className={css.hightRegulator}>
            <ul className={css.listWraper}>
              {waterItems.map((elem) => (
                <li key={elem.data._id}>
                  <TodayWaterItem
                    initialAmount={elem.data.amount}
                    initialDate={new Date(elem.data.date)}
                    onDelete={() => handleDelete(elem.data._id)}
                    onEdit={() => setEditingRecord(elem.data)}
                  />
                </li>
              ))}
            </ul>
            <button className={css.addBtn} onClick={handleAddWater}>
              <svg>
                <use href={`${icons}#icon-increment`}></use>
              </svg>
              <span>Add water</span>
            </button>
          </div>
        </div>
      </div>
      {editingRecord && (
        <EditWaterForm
          onClose={() => setEditingRecord(null)}
          initialAmount={editingRecord.amount}
          initialDate={new Date(editingRecord.date)}
          updateWaterData={(amount, date) => handleUpdate(editingRecord._id, amount, date)}
        />
      )}
    </div>
  );
};
