// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
// import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoek-G43Hlx6QRoQNo14-ItszaELWiHjc",
  authDomain: "cajero-cfe.firebaseapp.com",
  databaseURL: "https://cajero-cfe-default-rtdb.firebaseio.com",
  projectId: "cajero-cfe",
  storageBucket: "cajero-cfe.appspot.com",
  messagingSenderId: "885674224194",
  appId: "1:885674224194:web:790507d8a951eac9f4dbdb",
  measurementId: "G-KP8B5EZ374",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const db = getDatabase(app)
