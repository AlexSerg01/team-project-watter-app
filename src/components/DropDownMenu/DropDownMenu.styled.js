import styled from "styled-components";

export const DropDownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const DropDownBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: inherit;
  height: 100%;
  gap: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const UserName = styled.p`
  color: var(--PRIMERY-BLACK);
  font-size: 16px;
  font-weight: 400;
  text-align: right;
  line-height: 1.25;
`;

export const UserAvatar = styled.img`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  `;

export const CreateAvatar = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--PRIMERY-BLUE);
  background-color: var(--PRIMERY-WHITE);
  color: var(--PRIMERY-BLUE);
  font-size: 14px;
  font-weight: 500;

  &.avatar-large {
    width: 80px;
    height: 80px;
    font-size: 36px;
    margin-right: 10px;
    border: 2px solid var(--PRIMERY-BLUE);
  }
`;

export const ChevronIcon = styled.svg`
  height: 16px;
  width: 16px;
`;

export const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  top: 100%;
  right: 0;
  width: 120px;
  background: inherit;
  border-radius: 10px;
  padding: 16px 16px;
  box-shadow: 0px 4px 8px 0px #407BFF33;
  z-index: 1000;
`;

export const MenuItem = styled.button`
  display: flex;
  width: 100%;
  padding: 0;
  gap: 8px;
  align-items: center;
  background: none;
  border: none;
  color: var(--PRIMERY-BLUE);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;