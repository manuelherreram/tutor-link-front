// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref} from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJezbLzJrY8Ijc4I-z0rRVmR5dn1Y0ykk",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

console.log('Configuración de Firebase:', firebaseConfig);

const app = initializeApp(firebaseConfig);
console.log('Aplicación Firebase inicializada:', app);
// Initialize Firebase
// Obtiene una referencia al almacenamiento de Firebase
const storage = getStorage(app);
const storageRef = ref(storage);
console.log('Referencia al almacenamiento Firebase:', storage);
console.log(storageRef, 'storageRef1')
// Exporta la referencia al almacenamiento de Firebase para que otros archivos puedan usarlo
const auth = getAuth(app); // Obtén el objeto auth


export { storage, storageRef,app , auth};
