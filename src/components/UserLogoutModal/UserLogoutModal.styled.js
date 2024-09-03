import styled from "styled-components";

export const ModalBackdrop =  styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 80px;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 24px;
  width: 280px; 
  height: 260px;
  border-radius: 10px;
  padding: 32px 24px;
  background-color: var(--PRIMERY-WHITE);

  @media (min-width: 768px)  {
    top: 200px;
    width: 592px; 
    height: 208px;
  }

  @media (min-width: 1440px)  {
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;
`;

export const TitleModal = styled.h2`
font-weight: 500;
font-size: 26px;
line-height: 1.25;
`;

export const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    border: none;
  }
`;

export const ModalText = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.1;
`;

export const ContainerLogoutBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px)  {
    justify-content: end;
    flex-direction: row-reverse;
  }

  @media (min-width: 1440px)  {
    justify-content: start;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 10px;
  padding: 8px 30px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.25;
  cursor: pointer;

  @media (min-width: 768px)  {
    width: 160px;
    height: 44px;
    padding: 10px 30px;
  }

  &:focus,
  &:hover,
  &:active {
    outline: none;
    border: none;
  }

  &.logout-button {
    background-color: var(--SECONDARY-RED);
    color: var(--PRIMERY-WHITE);
    box-shadow: 0px 4px 8px 0px hsla(221, 100%, 63%, 0.34);;
  }

  &.cancel-button {
    background-color: var(--SECONDARY-GRAY);
    color: var(--PRIMERY-BLUE);
  }
`;