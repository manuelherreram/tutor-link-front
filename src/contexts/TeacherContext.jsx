import { createContext, useContext, useState } from 'react';


export const TeacherContext = createContext();

export const TeacherContextProvider = ({ children }) => {
  
    const[teacher,setTeacher]=useState([]);
    const [subject, setSubject] = useState('');


  return (
    <TeacherContext.Provider value={{ teacher,setTeacher,subject,setSubject }}>
      {children}
    
    </TeacherContext.Provider>
  );
};

export const useTeacherState = () => useContext(TeacherContext);