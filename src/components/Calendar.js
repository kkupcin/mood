import { getCalendarTemplate } from "../utils/calendarUtils";
import CalendarModal from "./CalendarModal";
import React, { useEffect, useState } from "react";
import Parse from "parse";
import {
  CalendarItem,
  CalendarList,
  ColorGuide,
  StyledCalendar,
  StyledCalendarContainer,
  Arrow,
} from "./styles/StyledCalendar.styled";

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInfo, setDaysInfo] = useState(getCalendarTemplate(currentDate));
  const [fetchedDays, setFetchedDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clickedDayInfo, setClickedDayInfo] = useState([]);
  const [monthsFilled, setMonthsFilled] = useState({
    firstDate: currentDate,
    lastDate: currentDate,
  });

  // Fetch all day information for current user
  const fetchDays = async () => {
    try {
      let newFetchedDays = await Parse.Cloud.run("fetchDays");
      setFetchedDays(newFetchedDays);
    } catch (err) {
      alert(err);
    }
  };

  // Set day information for display
  const getDate = () => {
    let placeholderData = getCalendarTemplate(currentDate);

    let checkFirstMonth =
      (fetchedDays[0] && fetchedDays[0].get("date")) || new Date();
    let checkLastMonth = new Date();

    fetchedDays.forEach((day) => {
      let currIndex = day.get("date").getDate() - 1;

      if (day.get("date") < checkFirstMonth) {
        checkFirstMonth = day.get("date");
      }

      if (day.get("date") > checkLastMonth) {
        checkLastMonth = day.get("date");
      }

      if (
        getLocaleStringMonth(day.get("date")) ===
          getLocaleStringMonth(currentDate) &&
        day.get("date").getFullYear() === currentDate.getFullYear()
      ) {
        placeholderData[0].days[currIndex].mood = day.get("mood");
        placeholderData[0].days[currIndex].playlist = day.get("playlist").id;
        placeholderData[0].days[currIndex].movie = day.get("movie").id;
        placeholderData[0].days[currIndex].book = day.get("book").id;
        placeholderData[0].days[currIndex].date = day.get("date");
      }
    });

    // Check which months are filled for display
    setMonthsFilled({
      firstDate: checkFirstMonth,
      lastDate: checkLastMonth,
    });

    setDaysInfo(placeholderData);
  };

  // Get shown month name in long format
  const getLocaleStringMonth = (date) => {
    return date.toLocaleString("en-US", { month: "long" });
  };

  // Fetch days info on mount
  useEffect(() => {
    fetchDays();
  }, []);

  // Set date info again if the currently shown date or information changes
  useEffect(() => {
    getDate();
  }, [fetchedDays, currentDate]);

  // Handle opening modal for a specific day
  const openDayInfoHandler = (e) => {
    const clickedDay = daysInfo[0].days.find(
      (day, index) => index + 1 === parseInt(e.target.innerText)
    );

    setClickedDayInfo(clickedDay);

    setShowModal(true);
  };

  // Click on "x" handler
  const closeModalHandler = () => {
    setShowModal(false);
  };

  // Handle arrow click to change the month
  const changeMonthHandler = (e) => {
    let date = new Date(currentDate);
    if (e.target.id === "arrow-forward") {
      date.setMonth(date.getMonth() + 1);
    } else if (e.target.id === "arrow-back") {
      date.setMonth(date.getMonth() - 1);
    }
    setCurrentDate(date);
  };

  return (
    <React.Fragment>
      {showModal && (
        <CalendarModal
          showModal={showModal}
          closeModal={closeModalHandler}
          data={clickedDayInfo}
          year={currentDate.getFullYear()}
          month={currentDate.toLocaleString("en-US", {
            month: "long",
          })}
          monthIndex={currentDate.getMonth() + 1}
          day={daysInfo[0].days.indexOf(clickedDayInfo) + 1}
          mood={clickedDayInfo.mood}
        />
      )}
      <StyledCalendarContainer>
        <StyledCalendar>
          <h1>Your Mood Calendar</h1>
          <h3>
            {currentDate.toLocaleString("en-US", {
              month: "long",
            })}
          </h3>
          <div>
            <Arrow
              position="left"
              visible={
                currentDate.getMonth() - 1 >= monthsFilled.firstDate.getMonth()
              }
              disabled={
                !(
                  currentDate.getMonth() - 1 >=
                  monthsFilled.firstDate.getMonth()
                )
              }
              id="arrow-back"
              className="fas fa-chevron-left"
              onClick={changeMonthHandler}
            ></Arrow>
            <CalendarList>
              {daysInfo[0].days.map((day, index) => {
                return (
                  <CalendarItem
                    onClick={openDayInfoHandler}
                    mood={daysInfo[0].days[index].mood}
                    className={
                      currentDate.getFullYear() === new Date().getFullYear() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      index >= new Date().getDate()
                        ? "disabled"
                        : ""
                    }
                  >
                    <span>{!day.date ? index + 1 : day.date.getDate()}</span>
                  </CalendarItem>
                );
              })}
            </CalendarList>
            <Arrow
              position="right"
              visible={
                currentDate.getMonth() + 1 <= monthsFilled.lastDate.getMonth()
              }
              disabled={
                !(
                  currentDate.getMonth() + 1 <=
                  monthsFilled.lastDate.getMonth()
                )
              }
              id="arrow-forward"
              className="fas fa-chevron-right"
              onClick={changeMonthHandler}
            ></Arrow>
          </div>
        </StyledCalendar>

        <ColorGuide>
          <li>
            <CalendarItem mood="sad"></CalendarItem>
            Sad
          </li>
          <li>
            <CalendarItem mood="lonely"></CalendarItem>
            Lonely
          </li>
          <li>
            <CalendarItem mood="happy"></CalendarItem>
            Happy
          </li>
          <li>
            <CalendarItem mood="adventurous"></CalendarItem>
            Adventurous
          </li>
          <li>
            <CalendarItem mood="nostalgic"></CalendarItem>
            Nostalgic
          </li>
          <li>
            <CalendarItem mood="afraid"></CalendarItem>
            Afraid
          </li>
          <li>
            <CalendarItem mood="excited"></CalendarItem>
            Excited
          </li>
        </ColorGuide>
      </StyledCalendarContainer>
    </React.Fragment>
  );
};

export default Calendar;
