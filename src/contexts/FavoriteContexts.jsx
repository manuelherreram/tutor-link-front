import { createContext, useContext, useState, useEffect } from 'react';
import { addFavorite, removeFavorite, listFavorites } from '../api/apiFavs';
import { useAuth } from '../contexts/AuthContext';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useAuth();
  

  const toggleFavorite = async (teacherId) => {
    try {
      const isFavorited = favorites.includes(teacherId);

      if (isFavorited) {
        await removeFavorite(userId, teacherId);
        setFavorites(prevFavorites => prevFavorites.filter(favId => favId !== teacherId));
      } else {
        await addFavorite(userId, teacherId);
        setFavorites(prevFavorites => [...prevFavorites, teacherId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };




  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesList = await listFavorites(userId);
        setFavorites(favoritesList);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const value = {
    favorites,
    setFavorites,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
