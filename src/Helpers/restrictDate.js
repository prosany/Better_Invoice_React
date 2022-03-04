const restrictDate = () => {
  let dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  let minDate = year + "-" + month + "-" + day;
  return minDate;
};

export default restrictDate;
