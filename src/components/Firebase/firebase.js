import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBJiXObVkiagjh_qZ74lbF3n2EJMqOjL_U",
  authDomain: "insira-test.firebaseapp.com",
  databaseURL: "https://insira-test.firebaseio.com",
  projectId: "insira-test",
  storageBucket: "insira-test.appspot.com",
  messagingSenderId: "304088989670",
  appId: "1:304088989670:web:3e449ffbec3555549da027",
  measurementId: "G-S2HEVY96YQ"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
