import { auth } from "./firebaseConfig";
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  
  export const doCreateUserWithEmailAndPassword = async (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  
  export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
  };