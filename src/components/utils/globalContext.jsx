import { createContext, useContext, useState } from 'react';


export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  
    const[teacher,setTeacher]=useState([])


  return (
    <ContextGlobal.Provider value={{ teacher,setTeacher }}>
      {children}
    
    </ContextGlobal.Provider>
  );
};

export const useTutorState = () => useContext(ContextGlobal);