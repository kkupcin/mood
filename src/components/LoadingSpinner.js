import { StyledLoadingSpinner } from "./styles/StyledLoadingSpinner.styled";

const LoadingSpinner = (props) => {
  return (
    <StyledLoadingSpinner className={props.className}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoadingSpinner>
  );
};

export default LoadingSpinner;
