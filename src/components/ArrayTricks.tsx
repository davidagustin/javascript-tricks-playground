import React from 'react';
import CodeBlock from './CodeBlock';

const ArrayTricks: React.FC = () => {
  const arrayExamples = [
    {
      title: "Remove Duplicates",
      description: "Create unique array using Set",
      code: "const unique = [...new Set([1, 2, 2, 3, 4, 4])]",
      result: Array.from(new Set([1, 2, 2, 3, 4, 4])),
      explanation: "Set automatically removes duplicates, spread operator converts back to array"
    },
    {
      title: "Flatten Nested Arrays",
      description: "Flatten arrays of any depth",
      code: "const flat = [1, [2, 3, [4, 5]]].flat(Infinity)",
      result: [1, [2, 3, [4, 5]]].flat(Infinity),
      explanation: "flat(Infinity) recursively flattens all nested levels"
    },
    {
      title: "Get Random Element",
      description: "Select random item from array",
      code: "const arr = ['apple', 'banana', 'cherry'];\nconst random = arr[~~(Math.random() * arr.length)]",
      result: (() => {
        const arr = ['apple', 'banana', 'cherry'];
        return arr[~~(Math.random() * arr.length)];
      })(),
      explanation: "~~ is double bitwise NOT for fast Math.floor, Math.random() * length gives random index"
    },
    {
      title: "Shuffle Array",
      description: "Randomly shuffle array elements",
      code: "const shuffled = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5)",
      result: [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5),
      explanation: "sort() with random comparison function shuffles the array"
    },
    {
      title: "Sum Array",
      description: "Calculate sum of numbers",
      code: "const sum = [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0)",
      result: [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0),
      explanation: "reduce() accumulates values, starting with initial value 0"
    },
    {
      title: "Create Range Array",
      description: "Generate array of numbers from 0 to n-1",
      code: "const range = [...Array(10).keys()]",
      result: Array.from(Array(10).keys()),
      explanation: "Array(10) creates array with 10 empty slots, keys() gives indices 0-9"
    },
    {
      title: "Create Range 1 to N",
      description: "Generate array from 1 to n",
      code: "const range1toN = Array.from({length: 10}, (_, i) => i + 1)",
      result: Array.from({length: 10}, (_, i) => i + 1),
      explanation: "Array.from() with mapping function creates array with custom values"
    },
    {
      title: "Find Max/Min",
      description: "Find maximum and minimum values",
      code: "const arr = [3, 1, 4, 1, 5, 9];\nconst max = Math.max(...arr);\nconst min = Math.min(...arr)",
      result: (() => {
        const arr = [3, 1, 4, 1, 5, 9];
        return { max: Math.max(...arr), min: Math.min(...arr) };
      })(),
      explanation: "Spread operator (...) expands array into individual arguments for Math.max/min"
    },
    {
      title: "Group by Property",
      description: "Group objects by a specific property",
      code: `const users = [
  {name: 'Alice', age: 25, city: 'NYC'},
  {name: 'Bob', age: 30, city: 'LA'},
  {name: 'Charlie', age: 25, city: 'NYC'}
];
const groupBy = (arr, key) => arr.reduce((acc, obj) => {
  const group = obj[key];
  acc[group] = acc[group] || [];
  acc[group].push(obj);
  return acc;
}, {});
const grouped = groupBy(users, 'city')`,
      result: (() => {
        const users = [
          {name: 'Alice', age: 25, city: 'NYC'},
          {name: 'Bob', age: 30, city: 'LA'},
          {name: 'Charlie', age: 25, city: 'NYC'}
        ];
        const groupBy = (arr: any[], key: string) => arr.reduce((acc, obj) => {
          const group = obj[key];
          acc[group] = acc[group] || [];
          acc[group].push(obj);
          return acc;
        }, {});
        return groupBy(users, 'city');
      })(),
      explanation: "reduce() builds an object where keys are property values and values are arrays of matching objects"
    },
    {
      title: "Chunk Array",
      description: "Split array into smaller chunks",
      code: `const chunk = (arr, size) => 
  Array.from({length: Math.ceil(arr.length/size)}, (_, i) => 
    arr.slice(i*size, i*size+size)
  );
const chunks = chunk([1,2,3,4,5,6,7,8], 3)`,
      result: (() => {
        const chunk = (arr: any[], size: number) => 
          Array.from({length: Math.ceil(arr.length/size)}, (_, i) => 
            arr.slice(i*size, i*size+size)
          );
        return chunk([1,2,3,4,5,6,7,8], 3);
      })(),
      explanation: "Array.from() creates array of calculated length, slice() extracts chunks of specified size"
    },
    {
      title: "Count Occurrences",
      description: "Count frequency of each element",
      code: `const count = arr => arr.reduce((acc, val) => {
  acc[val] = (acc[val] || 0) + 1;
  return acc;
}, {});
const frequencies = count(['a', 'b', 'a', 'c', 'b', 'a'])`,
      result: (() => {
        const count = (arr: any[]) => arr.reduce((acc: any, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {});
        return count(['a', 'b', 'a', 'c', 'b', 'a']);
      })(),
      explanation: "reduce() builds frequency object, incrementing count for each occurrence"
    },
    {
      title: "Remove Falsy Values",
      description: "Filter out falsy values (false, 0, '', null, undefined, NaN)",
      code: "const clean = [0, 1, false, 2, '', 3, null, undefined, NaN].filter(Boolean)",
      result: [0, 1, false, 2, '', 3, null, undefined, NaN].filter(Boolean),
      explanation: "Boolean constructor as filter function removes all falsy values"
    },
    {
      title: "Array Intersection",
      description: "Find common elements between arrays",
      code: `const intersection = (a, b) => a.filter(x => b.includes(x));
const common = intersection([1,2,3,4], [3,4,5,6])`,
      result: (() => {
        const intersection = (a: any[], b: any[]) => a.filter(x => b.includes(x));
        return intersection([1,2,3,4], [3,4,5,6]);
      })(),
      explanation: "filter() keeps only elements that exist in both arrays using includes()"
    },
    {
      title: "Array Union",
      description: "Combine arrays and remove duplicates",
      code: "const union = [...new Set([...a, ...b])]",
      result: (() => {
        const a = [1,2,3];
        const b = [3,4,5];
        return Array.from(new Set([...a, ...b]));
      })(),
      explanation: "Spread operator combines arrays, Set removes duplicates"
    },
    {
      title: "Rotate Array",
      description: "Rotate array by k positions",
      code: `const rotate = (arr, k) => [...arr.slice(-k % arr.length), ...arr.slice(0, -k % arr.length)];
const rotated = rotate([1,2,3,4,5], 2)`,
      result: (() => {
        const rotate = (arr: any[], k: number) => [...arr.slice(-k % arr.length), ...arr.slice(0, -k % arr.length)];
        return rotate([1,2,3,4,5], 2);
      })(),
      explanation: "slice(-k) gets last k elements, slice(0, -k) gets remaining elements, modulo handles overflow"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>🔢 Array Manipulation Tricks</h2>
      <p className="section-description">
        Master array operations with these powerful one-liners and techniques.
      </p>

      <div className="examples-grid">
        {arrayExamples.map((example, index) => (
          <div key={index} className="example-card">
            <CodeBlock {...example} category="arrays" />
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li><strong>Performance:</strong> Use Set for unique values, reduce() for aggregations</li>
          <li><strong>Readability:</strong> Consider breaking complex one-liners into multiple lines</li>
          <li><strong>Immutability:</strong> Use spread operator and array methods that return new arrays</li>
          <li><strong>Edge Cases:</strong> Always handle empty arrays and null/undefined values</li>
        </ul>
      </div>
    </div>
  );
};

export default ArrayTricks;
