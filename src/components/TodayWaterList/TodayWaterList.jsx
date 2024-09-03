import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { TodayWaterItem } from "./TodayWaterItem/TodayWaterItem";
import css from "./addwaterlist.module.css";
import icons from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { addWaterRecord, deleteWaterRecord } from "../../redux/water/waterOperations";
import { selectWaterRecords } from "../../redux/water/waterSelectors";

export const TodayWaterList = () => {
  const dispatch = useDispatch();

  const waterRecords = useSelector(selectWaterRecords);
  const [waterItems, setWaterItems] = useState(waterRecords);

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
                    initialDate={new Date()}
                    onDelete={() => handleDelete(elem._id)}
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
    </div>
  );
};
