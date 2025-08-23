import React from 'react';
import CodeBlock from './CodeBlock';

const NumberTricks: React.FC = () => {
  const numberExamples = [
    {
      title: "Round to Decimal Places",
      description: "Round number to specific decimal places",
      code: "const rounded = Math.round(num * 100) / 100",
      result: (() => {
        const num = 3.14159;
        return Math.round(num * 100) / 100;
      })(),
      explanation: "Multiply by 10^n, round, then divide by 10^n"
    },
    {
      title: "Random Number in Range",
      description: "Generate random number between min and max",
      code: "const random = (min, max) => Math.random() * (max - min) + min",
      result: (() => {
        const random = (min: number, max: number) => Math.random() * (max - min) + min;
        return random(1, 10);
      })(),
      explanation: "Math.random() gives 0-1, scale to desired range"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>🔢 Number Operations</h2>
      <p className="section-description">
        Mathematical operations and number formatting tricks.
      </p>
      <div className="examples-grid">
        {numberExamples.map((example, index) => (
          <div key={index} className="example-card">
            <CodeBlock {...example} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberTricks;
