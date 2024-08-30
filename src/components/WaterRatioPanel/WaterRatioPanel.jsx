import { useSelector } from "react-redux";
import moment from "moment";

import {
  RangeAndAddWater,
  RangeDiv,
  RangeTitle,
  StyledRangeInput,
  PercentageDiv,
  PercentageOfRange,
  BoldPercentageOfRange,
  ButtonAddWater,
  SvgButton,
} from "./WaterRatioPanel.styled";

import {
  todayConsumptionPercentageSelector,
  // Цей селектор, ймовірно, витягує відсоток споживання води за сьогодні
  viewingDateSelector,
  // Цей селектор, ймовірно, витягує дату, яку користувач переглядає або яка впливає на відображення даних.
} 
// from "  ";

import iconSprite from "images/icons.svg";
import { useState, useEffect } from "react";
import { WaterConsumptionAddModal } 
// Аналогічно до попереднього селектора, цей витягує значення viewingDate. Це, можливо, дата, яку користувач переглядає або яка впливає на відображення даних.
// from "";

export const WaterRatioPanel = () => {
  const consumptionPercentage = useSelector(todayConsumptionPercentageSelector);
  const viewingDate = useSelector(viewingDateSelector);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    let over_flow = "auto";
    if (isOpen) {
      over_flow = "hidden";
    }
    body.style.overflow = over_flow;
  }, [isOpen]);

  const sliderStyle = {
    background: `linear-gradient(to right, #9EBBFF ${consumptionPercentage}%, #D7E3FF ${consumptionPercentage}%)`,
  };

  return (
    <RangeAndAddWater>
      <RangeDiv>
        <RangeTitle>
          {viewingDate ? moment(viewingDate).format("LL") : "Today"}
        </RangeTitle>
        <StyledRangeInput
          type="range"
          value={consumptionPercentage}
          style={sliderStyle}
          min="0"
          max="100"
          readOnly={true}
        />
        <PercentageDiv>
          <PercentageOfRange>0%</PercentageOfRange>
          <PercentageOfRange>
            <BoldPercentageOfRange>50%</BoldPercentageOfRange>
          </PercentageOfRange>
          <PercentageOfRange>100%</PercentageOfRange>
        </PercentageDiv>
      </RangeDiv>
      <ButtonAddWater onClick={() => setIsOpen(true)}>
        <SvgButton>
          <use href={iconSprite + "#icon-plus-circle"} />
        </SvgButton>
        Add Water
      </ButtonAddWater>
      <WaterConsumptionAddModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </RangeAndAddWater>
  );
};
