import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';



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
  const [apiUserId, setApiUserId] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({ ...user });
        console.log(user)
        setUserLoggedIn(true);

        try {
          // Fetch the ID token using getIdTokenResult
          const idTokenResult = await getIdTokenResult(user);
          setIdToken(idTokenResult.token);
          setIsAdmin(idTokenResult.claims.role === 'ADMIN');
           // Obtener el ID de la API a partir del UID de Firebase
           const apiId = await getUserId(user.uid);
           setApiUserId(apiId);
        } catch (error) {
          console.error('Error fetching ID token or user data:', error);
        }
      
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIdToken(null); // Clear ID token when user logs out
        setIsAdmin(false);
        setApiUserId(null); // Clear API user ID when user logs out
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn,
    currentUser,
    apiUserId,
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
