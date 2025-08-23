import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoriteTrick {
  category: string;
  title: string;
  code: string;
}

interface FavoritesContextType {
  favorites: FavoriteTrick[];
  addFavorite: (trick: FavoriteTrick) => void;
  removeFavorite: (trick: FavoriteTrick) => void;
  isFavorite: (trick: FavoriteTrick) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteTrick[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('js-tricks-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('js-tricks-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (trick: FavoriteTrick) => {
    setFavorites(prev => {
      const exists = prev.some(fav => 
        fav.category === trick.category && 
        fav.title === trick.title && 
        fav.code === trick.code
      );
      if (!exists) {
        return [...prev, trick];
      }
      return prev;
    });
  };

  const removeFavorite = (trick: FavoriteTrick) => {
    setFavorites(prev => 
      prev.filter(fav => 
        !(fav.category === trick.category && 
          fav.title === trick.title && 
          fav.code === trick.code)
      )
    );
  };

  const isFavorite = (trick: FavoriteTrick) => {
    return favorites.some(fav => 
      fav.category === trick.category && 
      fav.title === trick.title && 
      fav.code === trick.code
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
