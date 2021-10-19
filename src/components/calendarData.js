function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const setCalendarData = (currentDate) => {
  let calendarData = [];
  let daysInMon = daysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  let month = {
    days: [],
  };
  let day = {
    mood: "",
    book: {
      id: "",
    },
    movie: {
      id: "",
    },
    playlist: {
      id: "",
    },
    date: "",
  };

  for (let i = 0; i < daysInMon; i++) {
    month.days.push({ ...day });
  }
  calendarData.push(month);
  return calendarData;
};

export { setCalendarData };
