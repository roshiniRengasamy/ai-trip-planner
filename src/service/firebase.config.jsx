// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVzxxenJ_7_5uarAIHPjx0XUc32HBQHKk",
    authDomain: "travel-planner-b55dc.firebaseapp.com",
    projectId: "travel-planner-b55dc",
    storageBucket: "travel-planner-b55dc.firebasestorage.app",
    messagingSenderId: "123555889787",
    appId: "1:123555889787:web:dd4f9cbe2ce3694f5798de",
    measurementId: "G-X5M04TRNC9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)