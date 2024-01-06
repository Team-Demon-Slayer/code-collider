const getUserColor = (index) => {
  if (index === 0) {
    return "user-1";
  } else if (index === 1) {
    return "user-2";
  } else if (index === 2) {
    return "user-3";
  } else if (index === 3) {
    return "user-4";
  } else if (index === 4) {
    return "user-5";
  } else {
    return "";
  }
};

export default getUserColor;
