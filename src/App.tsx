import React, { useState } from 'react';
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

type TrickCategory = 
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

  const SelectedComponent = trickCategories[selectedCategory].component;

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 JavaScript Tricks & One-Liners Tutorial</h1>
        <p>Master JavaScript with practical examples and interactive code</p>
      </header>

      <nav className="category-nav">
        {Object.entries(trickCategories).map(([key, category]) => (
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

      <main className="tutorial-content">
        <SelectedComponent />
      </main>

      <footer className="App-footer">
        <p>💡 Tip: Click on any code example to copy it to clipboard!</p>
        <p>Built with React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
