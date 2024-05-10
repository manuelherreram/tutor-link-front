// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJezbLzJrY8Ijc4I-z0rRVmR5dn1Y0ykk",
  authDomain: "tutor-link-298b4.firebaseapp.com",
  projectId: "tutor-link-298b4",
  storageBucket: "tutor-link-298b4.appspot.com",
  messagingSenderId: "845559446712",
  appId: "1:845559446712:web:6645fc4d3bd17e11acc84d",
  measurementId: "G-W7K5N0L2P5"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
// Obtiene una referencia al almacenamiento de Firebase
const storage = getStorage(app);

// Exporta la referencia al almacenamiento de Firebase para que otros archivos puedan usarlo
export { storage };
