import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { getUsers } from '../api/api';


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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({ ...user });
        setUserLoggedIn(true);

        try {
          // Fetch the ID token using getIdTokenResult
          const idTokenResult = await getIdTokenResult(user);
          setIdToken(idTokenResult.token);

          const users = await getUsers(idTokenResult.token);
          
          const usersData = await getUsers(idTokenResult.token);
          const currentUserData = usersData.find(u => u.uid === user.uid);
          setIsAdmin(currentUserData && currentUserData.role === 'ADMIN');
        } catch (error) {
          console.error('Error fetching ID token or user data:', error);
        }
      
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIdToken(null); // Clear ID token when user logs out
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn,
    currentUser,
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
