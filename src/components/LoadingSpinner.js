import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`lds-ellipsis ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
