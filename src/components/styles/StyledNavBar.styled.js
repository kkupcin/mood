import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const StyledNavBar = styled.div`
  width: 90%;
  padding: 24px 0 0 18px;
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
      user-select: none;

      i {
        display: block;
        padding: 16px;
        cursor: pointer;
      }

      div {
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
        position: absolute;
        right: 8px;
        top: 120%;
        width: 180px;
        pointer-events: none;
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }

      &.active-hamburger {
        div {
          top: 100%;
          opacity: 1;
          pointer-events: auto;
        }
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
