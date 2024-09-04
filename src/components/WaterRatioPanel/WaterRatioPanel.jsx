import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BtnAddWater,
  ModalOverlay,
  PercentageValue,
  PercentageWrapper,
  WaterLabel,
  WaterPanel,
  WaterRangeField,
  WaterWrapper,
} from "./WaterRatioPanel.styled.js";
import { AddWaterForm } from "../../components/WaterRatioPanel/AddWaterForm.jsx";
import SpriteIcons from "../../assets/icons.svg";
import {
  selectWaterToday,
  selectWaterRate,
} from "../../redux/auth/selectors.js";

export const WaterRatioPanel = ({ openAddNewWaterRecordModalHandler }) => {

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
      <BtnAddWater type="button" onClick={openAddNewWaterRecordModalHandler}>
        <svg width="24" height="24" stroke="#fff" fill="none">
          <use xlinkHref={`${SpriteIcons}#icon-plus-circle`} />
        </svg>
        <span>Add water</span>
      </BtnAddWater>
     
    </WaterWrapper>
  );
};
