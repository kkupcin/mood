import styled from "styled-components";

export const Container = styled.div`
  max-width: 60%;
  height: 80vh;
  margin-left: ${({ left }) => left};
  margin-right: ${({ right }) => right};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${({ align }) => align}; 
  box-sizing: border-box;
`;
