import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StyledWarningBox } from "./styles/StyledWarningBox.styled";

const WarningBox = (props) => {
  const [closeWarningBox, setCloseWarningBox] = useState(false);

  let history = useHistory();

  // Close the warning box notice
  const onCloseWarning = () => {
    setCloseWarningBox(true);
  };

  // Navigate to the login page
  const navigationHandler = () => {
    history.push("/login");
  };

  return (
    <React.Fragment>
      {!closeWarningBox && (
        <StyledWarningBox onClick={onCloseWarning}>
          <div>
            <h1>X</h1>
            <h3>This is a demo account</h3>
            <p>
              You have been logged in to a Demo account. <br />
              To log in to a different account, please go <br />
              <span onClick={navigationHandler}>here</span>
            </p>
          </div>
        </StyledWarningBox>
      )}
    </React.Fragment>
  );
};

export default WarningBox;
