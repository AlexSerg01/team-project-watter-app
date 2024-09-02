import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BtnAddWater,
  PercentageValue,
  PercentageWrapper,
  WaterLabel,
  WaterPanel,
  WaterRangeField,
  WaterWrapper,
} from "./WaterRatioPanel.styled.js";
import { AddWaterForm } from "../../components/TodayWaterList/AddWaterListForm.jsx";
import SpriteIcons from "../../assets/icons.svg";
import {
  selectWaterToday,
  selectWaterRate,
} from "../../redux/auth/selectors.js";

export const WaterRatioPanel = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const waterTodayState = useSelector(selectWaterToday);
  const waterRate = useSelector(selectWaterRate);

  if (!waterTodayState || !waterRate) {
    return <div>Loading...</div>;
  }

  const { dailyWaterList } = waterTodayState;
  const totalWaterVolume = dailyWaterList.reduce(
    (sum, entry) => sum + entry.waterVolume,
    0
  );

  const handleRangeChange = (event) => {
    // Реалізуйте логіку обробки зміни діапазону, якщо потрібно
  };

  return (
    <WaterWrapper>
      <WaterPanel>
        <WaterLabel htmlFor="water-ratio">Today</WaterLabel>
        <WaterRangeField
          type="range"
          name="water-ratio"
          id="water-ratio"
          value={Math.round((totalWaterVolume / waterRate) * 100)}
          min="0"
          max="100"
          onChange={handleRangeChange}
        />
        <PercentageWrapper>
          <PercentageValue className="water-range-value-min">
            0%
          </PercentageValue>
          <PercentageValue className="water-range-value">50%</PercentageValue>
          <PercentageValue className="water-range-value-max">
            100%
          </PercentageValue>
        </PercentageWrapper>
      </WaterPanel>
      <BtnAddWater type="button" onClick={openModal}>
        <svg width="24" height="24" stroke="#fff" fill="none">
          <use xlinkHref={`${SpriteIcons}#icon-plus-circle`} />
        </svg>
        <span>Add water</span>
      </BtnAddWater>
      {modalIsOpen && (
        <AddWaterForm
          onClose={closeModal} // Переконайтеся, що onClose передається правильно
          initialAmount={0} // Або інше значення, яке потрібно
          initialDate={new Date()} // Або інше значення, яке потрібно
          updateWaterData={(amount, date) => {
            // Реалізуйте функцію оновлення даних про воду тут
            console.log("Amount:", amount);
            console.log("Date:", date);
          }}
        />
      )}
    </WaterWrapper>
  );
};
