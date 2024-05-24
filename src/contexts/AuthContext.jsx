import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null); // State to store the ID token

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);

        try {
          // Fetch the ID token using getIdTokenResult
          const idTokenResult = await getIdTokenResult(user);
          setIdToken(idTokenResult.token); 
          console.log(idToken, 'token');
        } catch (error) {
          console.error("Error fetching ID token:", error);
        }
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIdToken(null); // Clear ID token when user logs out
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn,
    currentUser,
    idToken, // Add the retrieved ID token to the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}