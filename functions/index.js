const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

exports.driver_sensor_update = functions.https.onRequest(async (req, res) => {
  const { uid, lat, lng, angle } = req.query;
  const ref = admin.database().ref(`drivers/${uid}`);
  const sensorData = {
    lat: Number(lat),
    lng: Number(lng),
    angle: Number(angle),
    lastUpdated: new Date().toString()
  };
  await ref
    .once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        ref.child("sensorData").set({ ...sensorData });
        res.send("success");
      } else {
        res.send("driver doesn't exist");
      }
      return sensorData;
    })
    .catch(error => {
      res.redirect(500, JSON.stringify(error));
    });

  //   res.redirect(303, snapshot.ref.toString());
});

exports.car_sensor_update = functions.https.onRequest(async (req, res) => {
  const { uid, lat, lng, angle } = req.query;
  const ref = admin.database().ref(`cars/${uid}`);
  const sensorData = {
    lat: Number(lat),
    lng: Number(lng),
    angle: Number(angle),
    lastUpdated: new Date().toString()
  };
  await ref
    .once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        ref.child("sensorData").set({ ...sensorData });
        res.send("success");
      } else {
        res.send("driver doesn't exist");
      }
      return sensorData;
    })
    .catch(error => {
      res.redirect(500, JSON.stringify(error));
    });
});
