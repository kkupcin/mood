import { Link } from "react-router-dom";
import styled from "styled-components";

export const MoodChanger = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  line-height: 1.5;
  justify-content: space-evenly;
  height: 10%;
  padding: 16px 8px 0;

  h3 {
    margin-bottom: 18px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 700px) {
    justify-content: space-between;
    font-size: 20px;

    ul {
      margin-left: 24px;
    }
  }
`;

export const StyledMoodLink = styled(Link)`
  border: 1px solid black;
  padding: 6px 18px;
  border-radius: 50px;
  font-size: 16px;
  margin: 8px 16px 8px 0;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: ${({ mood }) =>
    (mood === "sad" && "#C0C781") ||
    (mood === "adventurous" && "#841C26") ||
    (mood === "excited" && "#E9806E") ||
    (mood === "afraid" && "#477890") ||
    (mood === "nostalgic" && "#5B6C5D") ||
    (mood === "happy" && "#9067C6") ||
    (mood === "lonely" && "#C59B76")};

  border-color: ${({ mood }) =>
    (mood === "sad" && "#C0C781") ||
    (mood === "adventurous" && "#841C26") ||
    (mood === "excited" && "#E9806E") ||
    (mood === "afraid" && "#477890") ||
    (mood === "nostalgic" && "#5B6C5D") ||
    (mood === "happy" && "#9067C6") ||
    (mood === "lonely" && "#C59B76")};

  &:hover {
    color: white;
    cursor: pointer;

    background-color: ${({ mood }) =>
      (mood === "sad" && "#C0C781") ||
      (mood === "adventurous" && "#841C26") ||
      (mood === "excited" && "#E9806E") ||
      (mood === "afraid" && "#477890") ||
      (mood === "nostalgic" && "#5B6C5D") ||
      (mood === "happy" && "#9067C6") ||
      (mood === "lonely" && "#C59B76")};
  }

  @media screen and (max-width: 900px) {
    padding: 8px 18px;
    font-size: 18px;
    margin: 8px;
  }
`;
