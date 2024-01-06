function formatDateString(dateString) {
  var date = new Date(dateString);

  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day;
}

export default formatDateString;
