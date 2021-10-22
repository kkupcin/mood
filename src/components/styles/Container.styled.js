import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  margin-left: ${({ left }) => left};
  margin-right: ${({ right }) => right};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${({ align }) => align};
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  h1 {
    font-weight: 500;
    font-size: 36px;
    margin-bottom: 48px;
    margin-top: 48px;
  }
`;
