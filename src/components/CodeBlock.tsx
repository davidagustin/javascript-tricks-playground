import React, { useState } from 'react';
import { CodeBlockProps } from '../types/tricks';
import { useFavorites } from '../contexts/FavoritesContext';

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'javascript', 
  title, 
  result, 
  explanation,
  category = 'general',
  isFavorite: propIsFavorite,
  onToggleFavorite
}) => {
  const [copied, setCopied] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  // Generate a unique ID for this trick
  const trickId = `${category}-${title?.toLowerCase().replace(/\s+/g, '-')}`;
  const isFavorited = propIsFavorite !== undefined ? propIsFavorite : isFavorite(trickId);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const executeCode = () => {
    try {
      // Safe evaluation for demonstration
      const safeCode = code.replace(/console\.log/g, 'return');
      // eslint-disable-next-line no-new-func
      const func = new Function(safeCode);
      return func();
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const actualResult = result !== undefined ? result : executeCode();

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
    } else {
      if (isFavorited) {
        removeFavorite(trickId);
      } else {
        addFavorite({
          id: trickId,
          title: title || 'Untitled Trick',
          category,
          code
        });
      }
    }
  };

  return (
    <div className="code-block">
      {title && (
        <div className="code-title-container">
          <h4 className="code-title">{title}</h4>
          <button
            onClick={handleToggleFavorite}
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorited ? '⭐' : '☆'}
          </button>
        </div>
      )}
      
      <div className="code-container">
        <div className="code-header">
          <span className="language-tag">{language}</span>
          <div className="code-actions">
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
              title="Copy code to clipboard"
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>
        
        <pre className="code-content">
          <code>{code}</code>
        </pre>
      </div>

      {actualResult !== undefined && (
        <div className="result-container">
          <h5>Result:</h5>
          <pre className="result">
            {typeof actualResult === 'object' 
              ? JSON.stringify(actualResult, null, 2)
              : String(actualResult)
            }
          </pre>
        </div>
      )}

      {explanation && (
        <div className="explanation">
          <h5>Explanation:</h5>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
