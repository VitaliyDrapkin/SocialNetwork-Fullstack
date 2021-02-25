export const dateShowCalculate = (dateMileSeconds: number): string => {
  const dateNew = new Date().getTime();
  const secondsPassed = Math.floor((dateNew - dateMileSeconds) / 1000);
  if (secondsPassed < 60) {
    return "Just now";
  }
  if (secondsPassed < 60 * 60) {
    return calculateMinutes(secondsPassed);
  }
  if (secondsPassed < 60 * 60 * 24) {
    return calculateHours(secondsPassed);
  }
  if (secondsPassed < 60 * 60 * 24 * 2) {
    return "Yesterday";
  }
  return otherDates(dateMileSeconds);
};

const calculateMinutes = (seconds: number): string => {
  return Math.floor(seconds / 60) + "m";
};
const calculateHours = (seconds: number): string => {
  return Math.floor(seconds / 60 / 60) + "h";
};

const otherDates = (dateMileSeconds: number): string => {
  let date = new Date(dateMileSeconds);
  const day = date.toLocaleString("default", { day: "numeric" });
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return month + " " + day + " " + year;
};
