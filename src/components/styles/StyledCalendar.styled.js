import styled from "styled-components";

export const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 350px;
  justify-content: center;
  align-items: flex-end;
  min-height: 90vh;

  @media screen and (max-width: 1200px) {
    padding-right: 0;
    align-items: center;
  }

  @media screen and (max-width: 450px) {
    padding: 24px;
  }

  @media screen and (max-width: 320px) {
    padding-top: 48px;
  }
`;

export const StyledCalendar = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;

  h1 {
    font-weight: 500;
    font-size: 36px;
    margin-bottom: 32px;
  }

  h3 {
    font-size: 28px;
    margin: 24px;
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    margin: 0 auto;
  }

  @media screen and (max-width: 700px) {
    h1 {
      font-size: 32px;
    }

    div {
      width: 400px;
    }
  }

  @media screen and (max-width: 450px) {
    div {
      width: auto;
    }
  }
`;

export const CalendarList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;

  @media screen and (min-width: 700px) {
    gap: 24px;
  }

  @media screen and (min-width: 1000px) {
    gap: 32px;
  }
`;

export const CalendarItem = styled.li`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ mood }) =>
    (mood === "sad" && "#C0C781") ||
    (mood === "adventurous" && "#841C26") ||
    (mood === "excited" && "#E9806E") ||
    (mood === "afraid" && "#477890") ||
    (mood === "nostalgic" && "#5B6C5D") ||
    (mood === "happy" && "#9067C6") ||
    (mood === "lonely" && "#C59B76") ||
    (mood === "" && "#CCC")};

  &:hover span {
    display: block;
    top: 8px;
    opacity: 1;
  }

  &.disabled {
    pointer-events: none;
  }

  span {
    color: white;
    font-size: 18px;
    position: absolute;
    left: 0;
    right: 0;
    top: 24px;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    width: 28px;
    height: 28px;

    span {
      opacity: 1;
      top: 8px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 450px) {
    span {
      font-size: 14px;
    }
  }
`;

export const ColorGuide = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 48px 0;

  li {
    display: flex;
    align-items: center;
    font-size: 18px;
    gap: 8px;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 48px 12px;

    li {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 36px 0;
  }
`;

export const Arrow = styled.button`
  opacity: ${({ visible }) =>
    (visible === true && "1") || (visible === false && "0")};
  font-size: 24px;
  border: none;
  background-color: transparent;
  margin: ${({ position }) =>
    (position === "left" && "0 40px 0 0") ||
    (position === "right" && "0 0 0 40px")};
  color: inherit;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: auto;
  }

  @media screen and (max-width: 700px) {
    font-size: 20px;

    margin: ${({ position }) =>
      (position === "left" && "0 25px 0 0") ||
      (position === "right" && "0 0 0 25px")};
  }

  @media screen and (max-width: 450px) {
    margin: 0 12px;
  }
`;
