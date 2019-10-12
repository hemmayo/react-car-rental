import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import FirebaseContext from "./context";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // Authentication API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              ...authUser,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // Users API
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // Cars API
  car = uid => this.db.ref(`cars/${uid}`);
  cars = () => this.db.ref("cars");

  // Cars API
  driver = uid => this.db.ref(`drivers/${uid}`);
  drivers = () => this.db.ref("drivers");

  // Orders API
  order = uid => this.db.ref(`orders/${uid}`);
  orders = () => this.db.ref("orders");
}

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default Firebase;
export { withFirebase };
