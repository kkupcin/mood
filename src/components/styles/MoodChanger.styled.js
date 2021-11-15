import { Link } from "react-router-dom";
import styled from "styled-components";

export const MoodChanger = styled.div`
  display: flex;
  font-size: 24px;
  line-height: 1.5;
  align-items: center;
  justify-content: space-evenly;
  height: 10%;
  padding: 16px 8px 0;

  ul {
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 700px) {
    justify-content: space-between;
    font-size: 20px;

    ul {
      justify-content: flex-end;
      margin-left: 24px;
    }
  }
`;

export const StyledMoodLink = styled(Link)`
  text-decoration: none;
  margin: 8px 18px;
  font-style: italic;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  font-size: 20px;

  color: ${({ mood }) =>
    (mood === "sad" && "#C0C781") ||
    (mood === "adventurous" && "#841C26") ||
    (mood === "excited" && "#E9806E") ||
    (mood === "afraid" && "#477890") ||
    (mood === "nostalgic" && "#5B6C5D") ||
    (mood === "happy" && "#9067C6") ||
    (mood === "lonely" && "#C59B76") ||
    (mood === "" && "#CCC")};

  &:hover {
    opacity: 0.8;
  }
`;
