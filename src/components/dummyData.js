const dummyData = [];

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

let date = new Date();

const currentMonth = () => {
  let currMonth = date.getMonth();
  return currMonth + 1;
};

const currentYear = () => {
  return date.getFullYear();
};

const setDummyData = () => {
  let daysInMon = daysInMonth(currentMonth(), currentYear());
  let month = { month: currentMonth(), year: currentYear(), days: [] };
  let day = {
    mood: "",
    book: {
      title: "",
      author: "",
      desc: "",
    },
    movie: {
      title: "",
      desc: "",
    },
    playlist: {
      title: "",
      link: "",
    },
  };
  for (let i = 0; i < daysInMon; i++) {
    month.days.push(day);
  }
  dummyData.push(month)
};

setDummyData()

export { dummyData };
