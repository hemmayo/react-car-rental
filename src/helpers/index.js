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

export { snapshotToArray, snapshotToObject };
