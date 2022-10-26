// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-W3OwM_b1mYdZB0ZZZJ86LfRe2sc2A34",
  authDomain: "trabalhointegrado-ad395.firebaseapp.com",
  databaseURL: "https://trabalhointegrado-ad395-default-rtdb.firebaseio.com",
  projectId: "trabalhointegrado-ad395",
  storageBucket: "trabalhointegrado-ad395.appspot.com",
  messagingSenderId: "763944983583",
  appId: "1:763944983583:web:6bf2033d13cabb3d72492a",
  measurementId: "G-TZP6SKLYX1"
};

// Initialize Firebase
/* export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app); */

let analytics; 
let database;

if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  database = getFirestore(app);
}

export {analytics, database};
