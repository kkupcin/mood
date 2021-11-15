import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  margin-left: ${({ left }) => left};
  margin-right: ${({ right }) => right};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ align }) => align};
  box-sizing: border-box;
  flex: 1;


  h1 {
    font-weight: 500;
    font-size: 36px;
    margin-bottom: 48px;
    margin-top: 48px;
  }

  @media screen and (max-width: 1200px) {
    &.mood-page {
      width: 80%;
    }
  }

  @media screen and (max-width: 900px) {
    &.mood-page {
      align-items: center;
      justify-content: center;
    }
  }

  @media screen and (max-width: 700px) {
    width: 90%;
    margin: 0 auto;

    h1 {
      font-size: 32px;
    }
  }

  @media screen and (max-width: 550px) {
    width: 100%;
    padding: 0 32px;

    h1 {
      font-size: 28px;
    }

    &.mood-page {
      margin: 0;
      width: 100%;
    }
  }

  @media screen and (max-width: 320px) {
    &.mood-page {
      padding: 0;
      margin: 0;
      width: 100%;
    }
  }
`;
