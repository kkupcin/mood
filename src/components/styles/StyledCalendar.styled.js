import styled from "styled-components";

export const StyledCalendar = styled.div`
  text-align: center;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  margin-left: 40%;

  h1 {
    font-weight: 500;
    font-size: 36px;
    margin-bottom: 48px;
  }

  h3 {
    font-size: 28px;
    margin: 24px;
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  button {
  }

  ul {
  }

  span {
  }
`;

export const CalendarList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const CalendarItem = styled.li`
  height: 30px;
  width: 30px;
  margin: 16px;
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
    (mood === "" && "#CCC")
};

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
`;

export const ColorGuide = styled.div`
  position: absolute;
  bottom: 10%;
  right: 15%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  li {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
`;
