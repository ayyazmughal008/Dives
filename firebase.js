// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYfXP2IBqUcXrwa_TECl5mdfaP6-9_pVo",
  authDomain: "diversmv-45597.firebaseapp.com",
  projectId: "diversmv-45597",
  storageBucket: "diversmv-45597.appspot.com",
  messagingSenderId: "881817348263",
  appId: "1:881817348263:web:b2b814c3819c6dc77cd382"
};
// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export {auth}