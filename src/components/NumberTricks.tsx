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
    },
    {
      title: "Integer Random Number",
      description: "Generate random integer between min and max (inclusive)",
      code: "const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min",
      result: (() => {
        const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        return randomInt(1, 10);
      })(),
      explanation: "Use Math.floor() to get integer, add 1 to max for inclusive range"
    },
    {
      title: "Check if Number is Integer",
      description: "Check if a number is an integer",
      code: "const isInteger = num => Number.isInteger(num)",
      result: (() => {
        const isInteger = (num: number) => Number.isInteger(num);
        return `${isInteger(5)} (5), ${isInteger(5.5)} (5.5)`;
      })(),
      explanation: "Number.isInteger() returns true for integers, false for decimals"
    },
    {
      title: "Format Number with Commas",
      description: "Add thousand separators to numbers",
      code: "const formatNumber = num => num.toLocaleString()",
      result: (() => {
        const formatNumber = (num: number) => num.toLocaleString();
        return formatNumber(1234567);
      })(),
      explanation: "toLocaleString() automatically formats numbers with appropriate separators"
    },
    {
      title: "Clamp Number to Range",
      description: "Restrict number to min/max bounds",
      code: "const clamp = (num, min, max) => Math.min(Math.max(num, min), max)",
      result: (() => {
        const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
        return `${clamp(15, 0, 10)} (15 clamped), ${clamp(-5, 0, 10)} (-5 clamped)`;
      })(),
      explanation: "Use Math.min() and Math.max() to ensure number stays within bounds"
    },
    {
      title: "Check if Number is Even/Odd",
      description: "Check number parity",
      code: "const isEven = num => num % 2 === 0\nconst isOdd = num => num % 2 !== 0",
      result: (() => {
        const isEven = (num: number) => num % 2 === 0;
        const isOdd = (num: number) => num % 2 !== 0;
        return `Even: ${isEven(4)}, Odd: ${isOdd(7)}`;
      })(),
      explanation: "Use modulo operator (%) to check remainder when divided by 2"
    },
    {
      title: "Convert to Currency",
      description: "Format number as currency",
      code: "const toCurrency = num => new Intl.NumberFormat('en-US', {\n  style: 'currency',\n  currency: 'USD'\n}).format(num)",
      result: (() => {
        const toCurrency = (num: number) => new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(num);
        return toCurrency(1234.56);
      })(),
      explanation: "Intl.NumberFormat provides locale-aware currency formatting"
    },
    {
      title: "Calculate Percentage",
      description: "Calculate percentage of a number",
      code: "const percentage = (value, total) => (value / total) * 100",
      result: (() => {
        const percentage = (value: number, total: number) => (value / total) * 100;
        return `${percentage(25, 100)}% (25 of 100)`;
      })(),
      explanation: "Divide part by whole, multiply by 100 to get percentage"
    },
    {
      title: "Check if Number is Prime",
      description: "Check if number is prime",
      code: "const isPrime = num => {\n  if (num < 2) return false;\n  for (let i = 2; i <= Math.sqrt(num); i++) {\n    if (num % i === 0) return false;\n  }\n  return true;\n}",
      result: (() => {
        const isPrime = (num: number) => {
          if (num < 2) return false;
          for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
          }
          return true;
        };
        return `${isPrime(7)} (7), ${isPrime(4)} (4)`;
      })(),
      explanation: "Check divisibility up to square root for efficiency"
    },
    {
      title: "Generate Fibonacci Sequence",
      description: "Generate Fibonacci numbers",
      code: "const fibonacci = n => {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
      result: (() => {
        const fibonacci = (n: number): number => {
          if (n <= 1) return n;
          return fibonacci(n - 1) + fibonacci(n - 2);
        };
        return `[${fibonacci(0)}, ${fibonacci(1)}, ${fibonacci(2)}, ${fibonacci(3)}, ${fibonacci(4)}]`;
      })(),
      explanation: "Recursive function where each number is sum of previous two"
    },
    {
      title: "Convert Decimal to Binary",
      description: "Convert decimal number to binary string",
      code: "const toBinary = num => num.toString(2)",
      result: (() => {
        const toBinary = (num: number) => num.toString(2);
        return `${toBinary(10)} (10 in binary)`;
      })(),
      explanation: "toString(2) converts number to binary representation"
    },
    {
      title: "Convert Binary to Decimal",
      description: "Convert binary string to decimal number",
      code: "const fromBinary = binary => parseInt(binary, 2)",
      result: (() => {
        const fromBinary = (binary: string) => parseInt(binary, 2);
        return `${fromBinary('1010')} (1010 in decimal)`;
      })(),
      explanation: "parseInt(binary, 2) parses binary string to decimal number"
    },
    {
      title: "Calculate Factorial",
      description: "Calculate factorial of a number",
      code: "const factorial = n => n <= 1 ? 1 : n * factorial(n - 1)",
      result: (() => {
        const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
        return `${factorial(5)} (5!)`;
      })(),
      explanation: "Recursive function: n! = n × (n-1)!"
    },
    {
      title: "Check if Number is Power of 2",
      description: "Check if number is power of 2",
      code: "const isPowerOf2 = num => num > 0 && (num & (num - 1)) === 0",
      result: (() => {
        const isPowerOf2 = (num: number) => num > 0 && (num & (num - 1)) === 0;
        return `${isPowerOf2(8)} (8), ${isPowerOf2(7)} (7)`;
      })(),
      explanation: "Bitwise AND with (n-1) equals 0 for powers of 2"
    },
    {
      title: "Get Random Array Element",
      description: "Get random element from array",
      code: "const randomElement = arr => arr[Math.floor(Math.random() * arr.length)]",
      result: (() => {
        const randomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
        const arr = ['apple', 'banana', 'orange'];
        return randomElement(arr);
      })(),
      explanation: "Generate random index within array bounds"
    },
    {
      title: "Calculate Distance Between Points",
      description: "Calculate Euclidean distance",
      code: "const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))",
      result: (() => {
        const distance = (x1: number, y1: number, x2: number, y2: number) => 
          Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance(0, 0, 3, 4).toFixed(2);
      })(),
      explanation: "Use Pythagorean theorem: √((x₂-x₁)² + (y₂-y₁)²)"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>🔢 Number Operations</h2>
      <p className="section-description">
        Mathematical operations, number formatting, and mathematical tricks for efficient calculations.
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
