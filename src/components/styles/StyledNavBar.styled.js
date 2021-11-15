import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const StyledNavBar = styled.div`
  width: 80%;
  padding: 32px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hamburger {
    i {
      display: none;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 700px) {
    .hamburger {
      position: relative;
      align-items: flex-end;
      i {
        display: block;
      }

      div {
        flex-direction: column;
        align-items: flex-end;
        position: absolute;
        right: 0;
        top: 100%;
        width: 180px;
        height: 50px;
        pointer-events: none;
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }

      &.active-hamburger {
        div {
          top: 200%;
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    .hamburger {
      div {
        height: 45px;
      }
    }
  }
`;

export const NavBarLogo = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  font-size: 32px;
  font-weight: 700;
`;

export const NavBarLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  font-size: 20px;
  margin-left: 32px;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;
