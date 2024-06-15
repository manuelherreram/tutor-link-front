import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import {getUserId} from '../api/api'


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);

        try {
          // Fetch the ID token using getIdTokenResult
          const idTokenResult = await getIdTokenResult(user);
          setIdToken(idTokenResult.token);
          setIsAdmin(idTokenResult.claims.role === 'ADMIN');
           // Obtener el ID de la API a partir del UID de Firebase
           const apiId = await getUserId(user.uid);
           setUserId(apiId.id);
  
        } catch (error) {
          console.error('Error fetching ID token or user data:', error);
        }
      
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIdToken(null); // Clear ID token when user logs out
        setIsAdmin(false);
        setUserId(null); 
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn,
    currentUser,
    userId,
    idToken,
    isAdmin,
    setCurrentUser, // Add setter for currentUser
    setUserLoggedIn // Add setter for userLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
