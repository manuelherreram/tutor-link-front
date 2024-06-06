import { createContext,useContext,useState } from "react";
import { addFavorite } from "../api/apiFavs";
import {removeFavorite} from "../api/apiFavs"
import {useAuth} from '../contexts/AuthContext'
const FavoritesContext= createContext();

export function useFavorites() {
    return useContext(FavoritesContext);
  }
   export function FavoriteProvider({ children }) {
   
    const [favorites, setFavorites] = useState([]);
    const {apiUserId}=useAuth()
  

    const toggleFavorite = async (apiUserId, id) => {
      try {
          // Comprueba si el id ya está en la lista de favoritos
          const isFavorited = favorites.includes(id);

          if (isFavorited) {
              // Si ya es favorito, elimínalo de la lista de favoritos
              await removeFavorite(apiUserId,id);
          } else {
              // Si no es favorito, agrégalo a la lista de favoritos
              await addFavorite(apiUserId,id);
          }

      
          setFavorites((prevFavorites) =>
              isFavorited
                  ? prevFavorites.filter((favId) => favId !== id)
                  : [...prevFavorites, id]
          );
      } catch (error) {
          console.error('Error toggling favorite:', error);
          throw error;
      }
  };

    const value = {
      favorites,
      setFavorites,
      toggleFavorite,
    };
    return (
      <FavoritesContext.Provider value={value}>
        { children}
      </FavoritesContext.Provider>
    );
  }