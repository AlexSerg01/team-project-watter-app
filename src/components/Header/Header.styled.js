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
  background-color: transparent;

  padding: 8px 10px;

  @media (min-width: 768px)  {
    padding: 16px 16px;
  }

  @media (min-width: 1440px)  {
    padding: 12px 56px;
  }
`;

export const SignInLink = styled.a`
  color: #407BFF;
  text-decoration: none;
  font-size: 16px;
  display: inline-flex;
  align-items: center; 
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #407BFF;
  }

  @media (min-width: 768px)  {
    font-size: 18px;
  }
`;

export const SignInIcon = styled.img`
  margin-left: 10px;
  width: 28px;
  height: 28px;
`;