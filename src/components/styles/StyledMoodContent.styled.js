import styled from "styled-components";

export const StyledMoodContent = styled.div`
  display: flex;
  font-size: 18px;
  line-height: 1.5;
  align-items: center;
  justify-content: space-between;
  padding: 48px;

  .outer-mood-page-carousel {
    display: flex;
    align-items: center;

    img {
      width: 200px;
    }

    div {
      display: flex;
      flex-direction: column;
      padding-left: 48px;

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

  @media screen and (max-width: 700px) {
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
        h3 {
          font-size: 24px;
        }
      }
    }
  }
`;
