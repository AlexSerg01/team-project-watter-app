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
import SpriteIcons from "../../assets/icons.svg";
import {
  // selectWaterToday,
  selectWaterRate,
} from "../../redux/auth/selectors.js";
import { selectNorma } from "../../redux/water/waterSelectors.js";

export const WaterRatioPanel = ({ openAddNewWaterRecordModalHandler }) => {
  // const waterTodayState = useSelector(selectWaterToday) || {
  //   dailyWaterList: [],
  // };
  const waterRate = useSelector(selectWaterRate) || 1;
  // const dailyWaterList = waterTodayState.dailyWaterList;

  const waterDaylyInfo = useSelector((state) => state.water?.waterRecords || []);
  const totalWaterAmount = waterDaylyInfo.reduce(
    (total, record) => total + record.amount,
    0
  );


  const dailyNorma = Number(useSelector(selectNorma)) * 1000 || 1;
  

  const waterPercentage = Math.round((totalWaterAmount / dailyNorma) * 100);
  
  const validWaterPercentage = isNaN(waterPercentage) ? 0 : waterPercentage;

  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    console.log("New water percentage: ", newValue);
  };

  return (
    <WaterWrapper>
      <WaterPanel>
        <WaterLabel htmlFor="water-ratio">Today</WaterLabel>
        <WaterRangeField
          type="range"
          name="water-ratio"
          id="water-ratio"
          value={validWaterPercentage}
          min="0"
          max="100"
          onChange={handleRangeChange}
          disabled={waterRate === 0}
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