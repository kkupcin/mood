import { setCalendarData } from "./calendarData";
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

let clickedNumber = "";

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInfo, setDaysInfo] = useState(setCalendarData(currentDate));
  const [fetchedDays, setFetchedDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clickedDayInfo, setClickedDayInfo] = useState([]);
  const [monthsFilled, setMonthsFilled] = useState({
    firstDate: currentDate,
    lastDate: currentDate,
  });

  const fetchData = async () => {
    const query = new Parse.Query("Day");
    query.equalTo("user", Parse.User.current());

    try {
      let newFetchedDays = await query.find();
      setFetchedDays(newFetchedDays);
    } catch (err) {
      alert(err);
    }
  };

  const getDate = () => {
    let placeholderData = setCalendarData(currentDate);

    let checkFirstMonth =
      (fetchedDays[0] && fetchedDays[0].get("date")) || new Date();
    let checkLastMonth = new Date();

    let placeholderDataCopy = [...placeholderData];
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
        placeholderDataCopy[0].days[currIndex].mood = day.get("mood");
        placeholderDataCopy[0].days[currIndex].playlist =
          day.get("playlist").id;
        placeholderDataCopy[0].days[currIndex].movie = day.get("movie").id;
        placeholderDataCopy[0].days[currIndex].book = day.get("book").id;
        placeholderDataCopy[0].days[currIndex].date = day.get("date");
      }
    });

    setMonthsFilled({
      firstDate: checkFirstMonth,
      lastDate: checkLastMonth,
    });

    setDaysInfo(placeholderDataCopy);
  };

  const getLocaleStringMonth = (date) => {
    return date.toLocaleString("en-US", { month: "long" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getDate();
  }, [fetchedDays, currentDate]);

  const openDayInfoHandler = (e) => {
    const clickedDay = daysInfo[0].days.filter(
      (day, index) => index + 1 === parseInt(e.target.innerText)
    );

    clickedNumber = e.target.innerText;

    setClickedDayInfo(clickedDay);

    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

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
          closeModal={closeModalHandler}
          data={clickedDayInfo}
          year={currentDate.getFullYear()}
          month={currentDate.toLocaleString("en-US", {
            month: "long",
          })}
          monthIndex={currentDate.getMonth() + 1}
          day={clickedNumber}
          mood={clickedDayInfo[0].mood}
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
