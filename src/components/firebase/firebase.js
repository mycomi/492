import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCj14LPg5AcTbEWzLVNFnxhzvK1sfSVwMU",
    authDomain: "dorm-dj.firebaseapp.com",
    projectId: "dorm-dj",
    storageBucket: "dorm-dj.appspot.com",
    messagingSenderId: "880008722575",
    appId: "1:880008722575:web:f9d5144beae6e0da9258fa",
    measurementId: "G-3TF978ESRR"
  };

firebase.initializeApp(firebaseConfig);

export default firebase ;