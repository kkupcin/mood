import styled from "styled-components";

export const InnerModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  height: auto;
  max-width: 60%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 15px;
  padding: 60px;
  align-items: flex-start;

  h1 {
    font-size: 28px;
    padding: 0;
    height: 20%;
  }

  @media screen and (max-width: 1200px) {
    min-width: 70%;
    padding: 50px;
  }

  @media screen and (max-width: 700px) {
    
  }
`;

export const ModalBox = styled.div`
  box-sizing: border-box;
  padding: 0 64px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: flex-start;
  border-bottom: 0.5px solid #ccc;

  div {
    display: inline-block;
    padding: 42px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    h3 {
      font-size: 24px;
      margin: 12px 0;
    }

      img {
        width: 100%;
        object-fit: cover;
      }

      p {
        margin: 16px 0;
        font-size: 18px;
      }
  }

  @media screen and (max-width: 1200px) {
    padding: 0;
    div {
      
    }
  }
`;

export const ModalExit = styled.div`
  color: white;
  font-size: 30px;
  position: absolute;
  top: -50px;
  right: 0;
  opacity: 1;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
