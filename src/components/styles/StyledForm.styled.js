import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  font-size: 16px;
  text-transform: uppercase;

  div {
    display: flex;
    flex-direction: column;
    margin: 24px 0;
  }

  input {
    border: none;
    background-color: transparent;
    font-family: inherit;
    color: inherit;
    border-bottom: 1px solid #5A4C4C;
    padding: 14px;
    padding-left: 0;
    outline: none;
    margin-top: 12px;
    font-size: 18px;
  }

  button {
    border: none;
    background-color: #5A4C4C;
    color: white;
    font-family: inherit;
    font-size: 20px;
    margin: 40px;
    padding: 15px 40px;
    border-radius: 50px;
    align-self: center;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  button:disabled {
    background-color: #A7A7A9;
    cursor: default;
  }
`;
