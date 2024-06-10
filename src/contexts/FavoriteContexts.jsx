import { createContext, useContext, useState } from 'react';
import { addFavorite, removeFavorite, listFavorites } from '../api/apiFavs';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = async (userId, teacherId) => {
    try {
      const isFavorited = favorites.map(({ id }) => id).includes(teacherId);

      if (isFavorited) {
        await removeFavorite(userId, teacherId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter((favTeacher) => favTeacher.id !== teacherId)
        );
      } else {
        await addFavorite(userId, teacherId);
        setFavorites((prevFavorites) => [...prevFavorites, { id: teacherId }]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      if(userId){
         const favoritesList = await listFavorites(userId);
      setFavorites(favoritesList);
    } 
    }catch (error) {
      console.error('Error fetching favorites:', error);
      }
     
  };

  const value = {
    favorites,
    setFavorites,
    toggleFavorite,
    fetchFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
