import styled from "styled-components";
import { Link } from "react-router-dom";

export const Warning = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 240px;

  h1 {
    font-size: 48px;
    margin: 48px 0;
  }

  p {
    font-size: 24px;
    margin: 48px 0;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 32px;
  margin: 48px 0;
  opacity: 1;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
