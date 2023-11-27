// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Se você está usando autenticação
import { getFirestore } from "firebase/firestore"; // Se você está usando o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCvEy6YCNV_y3Vhp6wrblNdpWRP63j6EkQ",
  authDomain: "freedom-8718d.firebaseapp.com",
  projectId: "freedom-8718d",
  storageBucket: "freedom-8718d.appspot.com",
  messagingSenderId: "312453781335",
  appId: "1:312453781335:web:6c4cae8e4f1d5b8a305012",
  measurementId: "G-ZSKHFEKL5K"
};

// Inicialize o Firebase
const firebase = initializeApp(firebaseConfig);
// Exporte as funcionalidades que você deseja usar
// export const auth = firebase.auth();
export const firestore = getFirestore(firebase);