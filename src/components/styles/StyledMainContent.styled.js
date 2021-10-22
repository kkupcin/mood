import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledMainContent = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: baseline;
  font-size: 18px;
  font-weight: 700;
`;

export const StyledLink = styled(Link)`
  border: 2px solid black;
  padding: 16px 32px;
  border-radius: 50px;
  margin: 18px 32px 18px 0;
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
`;

export const StyledPara = styled.p`
  font-size: 24px;
  font-weight: 300;
  width: 80%;
  margin: 32px 0;
  line-height: 1.5;
`;
