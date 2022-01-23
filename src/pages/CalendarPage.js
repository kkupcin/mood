import { useEffect } from "react";
import Calendar from "../components/Calendar";

const CalendarPage = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.className = "img2";
  }, []);

  return <Calendar />;
};

export default CalendarPage;
