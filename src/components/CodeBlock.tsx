import React, { useState } from 'react';
import { CodeBlockProps } from '../types/tricks';

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'javascript', 
  title, 
  result, 
  explanation 
}) => {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="code-block">
      {title && <h4 className="code-title">{title}</h4>}
      
      <div className="code-container">
        <div className="code-header">
          <span className="language-tag">{language}</span>
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
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
