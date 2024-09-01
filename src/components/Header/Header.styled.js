import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  margin: 0%, auto;
  margin-top: 8px;
  background-color: transparent;


  padding: 8px 10px;

  @media (min-width: 768px)  {
    margin-top: 16px;
    padding: 16px 16px;
  }

  @media (min-width: 1440px)  {
    margin-top: 12px;
    padding: 12px 56px;
  }
`;

export const SignInLink = styled.a`
  display: inline-block;
  color: var(--PRIMERY-BLUE);
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  display: inline-flex;
  align-items: center; 
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: var(--PRIMERY-BLUE);
  }

  @media (min-width: 768px)  {
    font-size: 18px;
    line-height: 1.33;
  }
`;

export const SignInIcon = styled.svg`
  margin-left: 10px;
  width: 28px;
  height: 28px;
`;