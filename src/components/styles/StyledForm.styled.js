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
    border-bottom: 1px solid #5a4c4c;
    padding: 14px;
    padding-left: 0;
    outline: none;
    margin-top: 12px;
    font-size: 18px;
  }

  button {
    border: none;
    background-color: #5a4c4c;
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
    background-color: #a7a7a9;
    cursor: default;
  }

  @media screen and (max-width: 1000px) {
    width: 80%;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    margin: 0 auto;
  }
`;
