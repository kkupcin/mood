import React, { useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Calendar from "../components/Calendar";
import Parse from "parse/lib/browser/Parse";

const CalendarPage = (props) => {
  // Set background image
  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img2";
  }, []);

  return (
    <React.Fragment>
      {Parse.User.current() ? <Calendar /> : <Redirect to="/" />}
    </React.Fragment>
  );
};

export default CalendarPage;
