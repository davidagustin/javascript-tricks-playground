import React from 'react';
import CodeBlock from './CodeBlock';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesTricks: React.FC = () => {
  const { favorites, removeFavorite, clearFavorites, favoritesCount } = useFavorites();

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
    }
  };

  if (favoritesCount === 0) {
    return (
      <div className="tricks-container">
        <h2>⭐ Favorites</h2>
        <p className="section-description">
          Your saved JavaScript tricks will appear here.
        </p>
        <div className="empty-favorites">
          <div className="empty-icon">⭐</div>
          <h3>No favorites yet</h3>
          <p>Start browsing tricks and click the star icon to add them to your favorites!</p>
          <div className="favorites-tips">
            <h4>💡 Tips:</h4>
            <ul>
              <li>Click the ⭐ button on any trick to save it</li>
              <li>Favorites are saved locally in your browser</li>
              <li>You can organize and review your saved tricks here</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tricks-container">
      <div className="favorites-header">
        <div className="favorites-title">
          <h2>⭐ Favorites</h2>
          <span className="favorites-count">{favoritesCount} saved tricks</span>
        </div>
        <button 
          onClick={handleClearAll}
          className="clear-favorites-btn"
          title="Clear all favorites"
        >
          🗑️ Clear All
        </button>
      </div>
      
      <p className="section-description">
        Your personal collection of JavaScript tricks and techniques.
      </p>

      <div className="examples-grid">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="example-card favorite-card">
            <div className="favorite-header">
              <span className="favorite-category">{favorite.category}</span>
              <button
                onClick={() => handleRemoveFavorite(favorite.id)}
                className="remove-favorite-btn"
                title="Remove from favorites"
              >
                ❌
              </button>
            </div>
            <CodeBlock
              title={favorite.title}
              code={favorite.code}
              category={favorite.category}
              isFavorite={true}
            />
            <div className="favorite-meta">
              <small>Added: {new Date(favorite.addedAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="favorites-actions">
        <button 
          onClick={handleClearAll}
          className="clear-favorites-btn-large"
        >
          🗑️ Clear All Favorites
        </button>
      </div>
    </div>
  );
};

export default FavoritesTricks;
