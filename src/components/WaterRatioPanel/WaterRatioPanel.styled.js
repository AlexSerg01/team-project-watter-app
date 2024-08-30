import styled from "styled-components";

export const StyledRangeInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: default;
  outline: none;
  border-radius: 15px;
  margin-bottom: 16px;
  margin-left: 9px;
  margin-right: 13px;
  display: block;
  height: 8px;
  background: var(--color-secondary-gray);
  @media (min-width: 320px) {
    width: 258px;
  }
  @media (min-width: 768px) {
    width: 334px;
  }
  @media (min-width: 1440px) {
    width: 360px;
  }

  /* Thumb: webkit */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 14px;
    width: 14px;
    background-color: var(--color-primary-white);
    border-radius: 50%;
    border: 1px solid var(--color-primary-blue);
  }

  /* Thumb: Firefox */
  &::-moz-range-thumb {
    height: 14px;
    width: 14px;
    background-color: var(--color-primary-white);
    border-radius: 50%;
    border: 1px solid var(--color-primary-blue);
  }
`;

export const RangeAndAddWater = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    gap: 24px;
    align-items: center;
  }
  @media (min-width: 1440px) {
    gap: 28px;
    margin-bottom: 0px;
  }
`;

export const RangeDiv = styled.div`
  width: 280px;
  @media (min-width: 768px) {
    width: 356px;
  }
  @media (min-width: 768px) {
    width: 391px;
  }
`;

export const RangeTitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 133%;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 8px;
  color: var(--color-primary-blue);
  @media (min-width: 768px) {
    margin-bottom: 16px;
  }
`;
export const PercentageOfRange = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: var(--color-primary-blue);
  left: 4px;
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    width: 1px;
    height: 8px;
    background-color: var(--color-secondary-gray);
  }
`;
export const BoldPercentageOfRange = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0em;
`;
export const PercentageDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: auto;
`;
export const ButtonAddWater = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: var(--color-primary-blue);
  color: var(--color-primary-white);
  box-shadow: 0 4px 8px 0 rgba(64, 123, 255, 0.34);
  &:hover,
  &:focus {
    box-shadow: 0 4px 14px 0 rgba(64, 123, 255, 0.54);
  }
  &:active {
    box-shadow: none;
  }
  transition: all 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98) 0s;
  @media (min-width: 320px) {
    width: 280px;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    padding: 8px 90px 8px 90px;
    width: 336px;
    height: 44px;
  }

  @media (min-width: 1440px) {
    width: 182px;
    padding: 10px 29px 10px 29px;
  }
`;
export const SvgButton = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  fill: transparent;
  stroke: var(--color-primary-white);
`;
