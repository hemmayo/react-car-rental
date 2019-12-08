import moment from "moment";

const snapshotToArray = snapshot => {
  if (snapshot) {
    const snapshotList = Object.keys(snapshot).map(key => ({
      ...snapshot[key],
      uid: key
    }));
    return snapshotList;
  }
};

const snapshotToObject = snapshot => {
  if (snapshot) {
    return snapshotToArray(snapshot)[0];
  }
};

const getPrice = (rate, start, end) => {
  start = moment(start);
  end = moment(end);

  const duration = moment.duration(end.diff(start));
  const hours = duration.asHours();
  const price = parseInt(hours * rate).toFixed(2);
  return typeof price === "number" ? price : 0;
};

const numberWithCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export { snapshotToArray, snapshotToObject, getPrice, numberWithCommas };
