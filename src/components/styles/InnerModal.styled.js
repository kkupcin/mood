import styled from "styled-components";

export const InnerModal = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  bottom: 0;
  width: 100vw;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  padding: 64px 24px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  h1 {
    font-size: 24px;
  }

  @media screen and (min-width: 500px) {
    border-radius: 8px;
    bottom: 10%;
    top: 10%;
    left: 10%;
    right: 10%;
    width: auto;
  }

  @media screen and (min-width: 700px) {
    top: 15%;
    left: 15%;
    right: 15%;
    bottom: 15%;
  }

  @media screen and (min-width: 1000px) {
    bottom: auto;
    right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 64px;
    overflow: visible;
  }
`;

export const ModalBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 80%;
    margin: 24px auto;

    h3 {
      font-size: 18px;
      font-weight: 700;
    }

    img {
      width: 100%;
      border-radius: 6px;
    }

    p {
      font-size: 18px;
    }
  }

  @media screen and (min-width: 500px) {
    div {
      h3 {
        font-size: 24px;
      }
    }
  }

  @media screen and (min-width: 700px) {
    gap: 16px;
  }

  @media screen and (min-width: 1000px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const ModalExit = styled.div`
  position: fixed;
  right: 5%;
  top: 2%;
  font-size: 24px;
  background-color: #f9f9f9;
  border-radius: 50%;
  padding: 4px 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  z-index: 4;

  &:hover {
    background-color: #eee;
  }

  @media screen and (min-width: 500px) {
    top: 5%;
  }

  @media screen and (min-width: 700px) {
    top: 10%;
    right: 15%;
  }

  @media screen and (min-width: 1000px) {
    top: -10%;
    right: 0;
  }
`;
