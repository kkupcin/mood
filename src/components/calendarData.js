let calendarData = [];

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

let date = new Date();

const currentMonth = () => {
  let currMonth = date.getMonth();
  return currMonth + 1;
};

const currentMonthName = () => {
  switch (currentMonth()) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Current Month";
  }
};

const currentYear = () => {
  return date.getFullYear();
};

const setCalendarData = () => {
  let daysInMon = daysInMonth(currentMonth(), currentYear());
  let month = { month: currentMonthName(), year: currentYear(), days: [] };
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
    month.days.push({...day});
  }
  calendarData.push(month);
};

setCalendarData();

export { calendarData };
