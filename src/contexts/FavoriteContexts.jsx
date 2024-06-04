import { createContext,useContext } from "react";

const FavoriteContext= createContext();

export function useFav() {
    return useContext(FavoriteContext);
  }
  export function FavProvider({ children }) {
   
 
  
    return (
      <AuthContext.Provider value={value}>
        { children}
      </AuthContext.Provider>
    );
  }