import styled from "styled-components";

export const StyledMoodContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  font-size: 18px;
  line-height: 1.5;
  align-items: center;
  justify-content: space-between;
  padding: 48px;
  min-height: 400px;

  .outer-mood-page-carousel {
    display: flex;
    align-items: center;

    img {
      width: 200px;
      flex-grow: 1;
      border-radius: 6px;
    }

    div {
      display: flex;
      flex-direction: column;
      padding-left: 48px;
      flex-grow: 4;

      h3 {
        font-size: 28px;
        padding-bottom: 28px;
      }

      p {
        a {
          text-decoration: none;
          color: inherit;
          font-size: 18px;
          font-style: italic;
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    font-size: 16px;
    padding: 0;

    .outer-mood-page-carousel {
      flex-direction: column;

      img {
        width: 150px;
        padding-bottom: 48px;
      }

      div {
        padding: 0;
        padding-bottom: 48px;
        h3 {
          font-size: 24px;
        }
      }
    }
  }
`;
