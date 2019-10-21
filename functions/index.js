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
  const { uid, lat, lng, speed } = req.body;
  const ref = admin.database().ref(`drivers/${uid}`);
  const sensorData = {
    lat: Number(lat),
    lng: Number(lng),
    speed: Number(speed),
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
  const { devAddr, lat, lng, angle, speed, temp } = req.body.payload_fields;
  const carRef = admin.database().ref(`cars`);
  const sensorData = {
    lat: Number(lat),
    lng: Number(lng),
    angle: Number(angle),
    speed: Number(speed),
    temp: Number(temp),
    lastUpdated: new Date().toString()
  };

  await carRef
    .once("value")
    .then(snapshot => {
      const cars = snapshotToArray(snapshot.val());

      if (cars) {
        let car = cars.filter(
          car => car.sensorId.toUpperCase() === devAddr.toUpperCase()
        );

        if (car.length > 0) {
          car = car[0];

          carRef
            .child(car.uid)
            .child("sensorData")
            .set({ ...car.sensorData, ...sensorData });

          res.send("success");
        } else {
          res.status(404).send("car doesn't exist");
        }
        return car;
      }
      return null;
    })
    .catch(error => {
      res.redirect(500, JSON.stringify(error));
    });
});
