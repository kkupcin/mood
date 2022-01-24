import styled from "styled-components";

export const StyledWarningBox = styled.div`
  position: absolute;
  top: 70px;
  left: 5%;
  right: 2%;
  border-radius: 10px;
  padding: 36px;
  background-color: #fff;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.350492);
  z-index: 2;

  div {
    position: relative;
    height: 100%;
    widht: 100%;

    h1 {
      position: absolute;
      font-size: 12px;
      font-weight: 700;
      top: -50%;
      right: -5%;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 700;
      texxt-align: center;
    }

    span {
      font-weight: 700;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    p {
      line-height: 1.2;
    }
  }

  @media screen and (min-width: 420px) {
    left: auto;

    div {
      h1 {
        top: -75%;
      }
    }
  }
`;
