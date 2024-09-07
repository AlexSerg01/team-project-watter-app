import { theme } from "../../components/theme";

import styled from "styled-components";

export const WaterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: normal;
  }
  @media screen and (min-width: 1440px) {
    top: 620px;
  }
`;

export const WaterPanel = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 356px;
  }
  @media screen and (min-width: 1440px) {
    width: 391px;
  }
`;

export const WaterLabel = styled.label`
  display: block;
  font-size: 18px;
  line-height: 1.33;
  color: ${theme.colors.blue};
  margin-bottom: ${theme.spacing(4)};
  text-align: start;
`;
export const WaterRangeField = styled.input`
  appearance: none;
  outline: none;
  width: 256px;
  height: 8px;
  padding: 5px 0;
  margin-bottom: ${theme.spacing(6)};
  margin-right: ${theme.spacing(4)};
  background: ${theme.colors.skyblue};
  border-radius: 10px;
  overflow: hidden;
  z-index: 0;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    z-index: 3;
    background: ${theme.colors.white};
    border-radius: 50%;
    border: 1px solid ${theme.colors.blue};
    cursor: pointer;
    // margin-top: -8px;
    box-shadow: -410px 0 0 400px ${theme.colors.lightblue};
  }
  @media screen and (min-width: 768px) {
    width: 325px;
  }
  @media screen and (min-width: 1440px) {
    width: 360px;
  }
`;
export const BtnAddWater = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 76px;
  width: 280px;
  background: ${theme.colors.blue};
  color: ${theme.colors.white};
  line-height: 1.25;
  box-shadow: 0px 4px 8px 0px rgba(64, 123, 255, 0.34);
  border-radius: 10px;
  border: none;
  margin-top: ${theme.spacing(8)};
  margin-bottom: ${theme.spacing(20)};
  cursor: pointer;
  transition: box-shadow ${theme.transition};

  &:hover {
    box-shadow: 0px 4px 14px 0px rgba(64, 123, 255, 0.54);
  }

  &:active {
    box-shadow: none;
  }

  & svg {
    margin-right: 10px;
  }

  @media screen and (min-width: 768px) {
    width: 336px;
    padding: 10px 104px;
    font-size: 18px;
    line-height: 1.33;
    margin-bottom: ${theme.spacing(30.5)};
  }
  @media screen and (min-width: 1440px) {
    width: 178px;
    padding: 10px 30px;
  }
`;

export const PercentageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PercentageValue = styled.span`
  color: ${theme.colors.blue};
  margin-top: ${theme.spacing(2)};
  position: relative;
  &:before {
    position: absolute;
    content: "";
    width: 1px;
    height: 8px;
    background-color: ${theme.colors.lightblue};
    left: 50%;
    top: -10px;
  }
  &:nth-child(2) {
    margin-left: ${theme.spacing(3.5)};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
