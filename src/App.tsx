import React, { useState, useEffect } from 'react';
import './App.css';
import ArrayTricks from './components/ArrayTricks';
import StringTricks from './components/StringTricks';
import ObjectTricks from './components/ObjectTricks';
import NumberTricks from './components/NumberTricks';
import FunctionalTricks from './components/FunctionalTricks';
import AsyncTricks from './components/AsyncTricks';
import DOMTricks from './components/DOMTricks';
import PerformanceTricks from './components/PerformanceTricks';
import LeetCodeTricks from './components/LeetCodeTricks';
import AdvancedTricks from './components/AdvancedTricks';
import FavoritesTricks from './components/FavoritesTricks';
import { FavoritesProvider } from './contexts/FavoritesContext';

type TrickCategory = 
  | 'favorites'
  | 'arrays'
  | 'strings'
  | 'objects'
  | 'numbers'
  | 'functional'
  | 'async'
  | 'dom'
  | 'performance'
  | 'leetcode'
  | 'advanced';

interface TrickCategoryInfo {
  name: string;
  description: string;
  component: React.ComponentType;
}

const trickCategories: Record<TrickCategory, TrickCategoryInfo> = {
  favorites: {
    name: '⭐ Favorites',
    description: 'Your saved JavaScript tricks',
    component: FavoritesTricks
  },
  arrays: {
    name: 'Array Manipulation',
    description: 'Powerful array operations and transformations',
    component: ArrayTricks
  },
  strings: {
    name: 'String Processing',
    description: 'String manipulation and formatting tricks',
    component: StringTricks
  },
  objects: {
    name: 'Object Operations',
    description: 'Object manipulation and utility functions',
    component: ObjectTricks
  },
  numbers: {
    name: 'Number Operations',
    description: 'Mathematical operations and number formatting',
    component: NumberTricks
  },
  functional: {
    name: 'Functional Programming',
    description: 'Higher-order functions and functional patterns',
    component: FunctionalTricks
  },
  async: {
    name: 'Async Operations',
    description: 'Promise tricks and async patterns',
    component: AsyncTricks
  },
  dom: {
    name: 'DOM Manipulation',
    description: 'Browser DOM tricks and utilities',
    component: DOMTricks
  },
  performance: {
    name: 'Performance & Debugging',
    description: 'Performance optimization and debugging tricks',
    component: PerformanceTricks
  },
  leetcode: {
    name: 'LeetCode Style',
    description: 'Competitive programming and algorithm tricks',
    component: LeetCodeTricks
  },
  advanced: {
    name: 'Advanced Patterns',
    description: 'Complex patterns and advanced techniques',
    component: AdvancedTricks
  }
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<TrickCategory>('arrays');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference and apply theme
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const SelectedComponent = trickCategories[selectedCategory].component;

  const filteredCategories = Object.entries(trickCategories).filter(([key, category]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
        <header className="App-header">
          <div className="header-content">
            <div className="header-left">
              <h1>🚀 JavaScript Tricks & One-Liners Tutorial</h1>
              <p>Master JavaScript with practical examples and interactive code</p>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search tricks by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        <nav className="category-nav">
          {filteredCategories.map(([key, category]) => (
            <button
              key={key}
              className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key as TrickCategory)}
            >
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </button>
          ))}
        </nav>

        {filteredCategories.length === 0 && searchQuery && (
          <div className="no-results">
            <h3>No results found for "{searchQuery}"</h3>
            <p>Try searching for different keywords or browse all categories</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="clear-all-btn"
            >
              Clear Search
            </button>
          </div>
        )}

        <main className="tutorial-content">
          <SelectedComponent />
        </main>

        <footer className="App-footer">
          <p>💡 Tip: Click on any code example to copy it to clipboard!</p>
          <p>🔍 Use the search bar to quickly find specific tricks</p>
          <p>🌙 Toggle dark mode for comfortable reading</p>
          <p>Built with React + TypeScript</p>
        </footer>
      </div>
  );
}

export default App;
