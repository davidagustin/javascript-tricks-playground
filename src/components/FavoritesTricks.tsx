import React from 'react';
import CodeBlock from './CodeBlock';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesTricks: React.FC = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="tricks-container">
        <h2>⭐ Favorites</h2>
        <p className="section-description">
          Your favorite JavaScript tricks will appear here.
        </p>
        <div className="empty-favorites">
          <p>No favorites yet. Start exploring tricks and click the ⭐ button to add them to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tricks-container">
      <div className="favorites-header">
        <h2>⭐ Favorites ({favorites.length})</h2>
        <button 
          onClick={clearFavorites}
          className="clear-favorites-btn"
          title="Clear all favorites"
        >
          🗑️ Clear All
        </button>
      </div>
      <p className="section-description">
        Your saved JavaScript tricks and one-liners.
      </p>

      <div className="examples-grid">
        {favorites.map((favorite, index) => (
          <div key={index} className="example-card favorite-card">
            <div className="favorite-card-header">
              <span className="category-badge">{favorite.category}</span>
              <button
                onClick={() => removeFavorite(favorite)}
                className="remove-favorite-btn"
                title="Remove from favorites"
              >
                ❌
              </button>
            </div>
            <CodeBlock 
              title={favorite.title}
              code={favorite.code}
              result="See original trick for result"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesTricks;
