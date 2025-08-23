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
  Array.from({length: Math.ceil(arr.length / size)}, (_, i) => 
    arr.slice(i * size, i * size + size)
  );
const chunks = chunk([1, 2, 3, 4, 5, 6], 2)`,
      result: (() => {
        const chunk = (arr: any[], size: number) => 
          Array.from({length: Math.ceil(arr.length / size)}, (_, i) => 
            arr.slice(i * size, i * size + size)
          );
        return chunk([1, 2, 3, 4, 5, 6], 2);
      })(),
      explanation: "Array.from() creates new array with calculated length, slice() extracts chunks"
    },
    {
      title: "Array Intersection",
      description: "Find common elements between arrays",
      code: `const intersection = (a, b) => 
  a.filter(x => b.includes(x));
const common = intersection([1, 2, 3], [2, 3, 4])`,
      result: (() => {
        const intersection = (a: any[], b: any[]) => 
          a.filter(x => b.includes(x));
        return intersection([1, 2, 3], [2, 3, 4]);
      })(),
      explanation: "filter() keeps elements that exist in both arrays using includes()"
    },
    {
      title: "Array Union",
      description: "Combine arrays and remove duplicates",
      code: `const union = (a, b) => [...new Set([...a, ...b])];
const combined = union([1, 2, 3], [2, 3, 4])`,
      result: (() => {
        const union = (a: any[], b: any[]) => [...new Set([...a, ...b])];
        return union([1, 2, 3], [2, 3, 4]);
      })(),
      explanation: "Spread operator combines arrays, Set removes duplicates"
    },
    {
      title: "Array Difference",
      description: "Find elements in first array not in second",
      code: `const difference = (a, b) => 
  a.filter(x => !b.includes(x));
const diff = difference([1, 2, 3], [2, 3, 4])`,
      result: (() => {
        const difference = (a: any[], b: any[]) => 
          a.filter(x => !b.includes(x));
        return difference([1, 2, 3], [2, 3, 4]);
      })(),
      explanation: "filter() keeps elements that don't exist in second array"
    },
    {
      title: "Rotate Array",
      description: "Rotate array elements by specified positions",
      code: `const rotate = (arr, k) => {
  const n = arr.length;
  const rotated = [...arr];
  for (let i = 0; i < n; i++) {
    rotated[(i + k) % n] = arr[i];
  }
  return rotated;
};
const rotated = rotate([1, 2, 3, 4, 5], 2)`,
      result: (() => {
        const rotate = (arr: any[], k: number) => {
          const n = arr.length;
          const rotated = [...arr];
          for (let i = 0; i < n; i++) {
            rotated[(i + k) % n] = arr[i];
          }
          return rotated;
        };
        return rotate([1, 2, 3, 4, 5], 2);
      })(),
      explanation: "Modulo operator (%) handles wrapping around array boundaries"
    },
    {
      title: "Count Occurrences",
      description: "Count frequency of each element",
      code: `const countOccurrences = (arr) => 
  arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
const counts = countOccurrences(['a', 'b', 'a', 'c', 'b'])`,
      result: (() => {
        const countOccurrences = (arr: any[]) => 
          arr.reduce((acc: any, val: any) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {});
        return countOccurrences(['a', 'b', 'a', 'c', 'b']);
      })(),
      explanation: "reduce() builds object with element counts, || 0 provides default value"
    },
    {
      title: "Find All Indices",
      description: "Find all positions of an element",
      code: `const findAllIndices = (arr, target) => 
  arr.reduce((acc, val, i) => {
    if (val === target) acc.push(i);
    return acc;
  }, []);
const indices = findAllIndices([1, 2, 3, 2, 4, 2], 2)`,
      result: (() => {
        const findAllIndices = (arr: any[], target: any) => 
          arr.reduce((acc: number[], val: any, i: number) => {
            if (val === target) acc.push(i);
            return acc;
          }, []);
        return findAllIndices([1, 2, 3, 2, 4, 2], 2);
      })(),
      explanation: "reduce() with index parameter builds array of matching indices"
    },
    {
      title: "Array Partition",
      description: "Split array based on condition",
      code: `const partition = (arr, fn) => 
  arr.reduce((acc, val) => {
    acc[fn(val) ? 0 : 1].push(val);
    return acc;
  }, [[], []]);
const [evens, odds] = partition([1, 2, 3, 4, 5], x => x % 2 === 0)`,
      result: (() => {
        const partition = (arr: any[], fn: (val: any) => boolean) => 
          arr.reduce((acc: any[][], val: any) => {
            acc[fn(val) ? 0 : 1].push(val);
            return acc;
          }, [[], []]);
        return partition([1, 2, 3, 4, 5], (x: number) => x % 2 === 0);
      })(),
      explanation: "reduce() creates two arrays: one for true conditions, one for false"
    },
    {
      title: "Zip Arrays",
      description: "Combine arrays element by element",
      code: `const zip = (...arrays) => 
  Array.from({length: Math.max(...arrays.map(a => a.length))}, (_, i) => 
    arrays.map(arr => arr[i])
  );
const zipped = zip([1, 2, 3], ['a', 'b', 'c'], [true, false, true])`,
      result: (() => {
        const zip = (...arrays: any[][]) => 
          Array.from({length: Math.max(...arrays.map(a => a.length))}, (_, i) => 
            arrays.map(arr => arr[i])
          );
        return zip([1, 2, 3], ['a', 'b', 'c'], [true, false, true]);
      })(),
      explanation: "Array.from() creates array of tuples, Math.max() finds longest array length"
    },
    {
      title: "Cartesian Product",
      description: "Generate all combinations of arrays",
      code: `const cartesian = (...arrays) => 
  arrays.reduce((acc, arr) => 
    acc.flatMap(x => arr.map(y => [...x, y])), 
    [[]]
  );
const product = cartesian([1, 2], ['a', 'b'])`,
      result: (() => {
        const cartesian = (...arrays: any[][]) => 
          arrays.reduce((acc: any[][], arr: any[]) => 
            acc.flatMap(x => arr.map(y => [...x, y])), 
            [[]]
          );
        return cartesian([1, 2], ['a', 'b']);
      })(),
      explanation: "reduce() with flatMap() generates all possible combinations"
    },
    {
      title: "Run-Length Encoding",
      description: "Compress array by counting consecutive elements",
      code: `const runLengthEncode = (arr) => 
  arr.reduce((acc, val) => {
    const last = acc[acc.length - 1];
    if (last && last[0] === val) {
      last[1]++;
    } else {
      acc.push([val, 1]);
    }
    return acc;
  }, []);
const encoded = runLengthEncode(['a', 'a', 'b', 'b', 'b', 'c'])`,
      result: (() => {
        const runLengthEncode = (arr: any[]) => 
          arr.reduce((acc: any[][], val: any) => {
            const last = acc[acc.length - 1];
            if (last && last[0] === val) {
              last[1]++;
            } else {
              acc.push([val, 1]);
            }
            return acc;
          }, []);
        return runLengthEncode(['a', 'a', 'b', 'b', 'b', 'c']);
      })(),
      explanation: "reduce() groups consecutive identical elements with their counts"
    },
    {
      title: "Array Permutations",
      description: "Generate all possible arrangements",
      code: `const permutations = (arr) => {
  if (arr.length <= 1) return [arr];
  return arr.flatMap((val, i) => 
    permutations([...arr.slice(0, i), ...arr.slice(i + 1)])
      .map(perm => [val, ...perm])
  );
};
const perms = permutations([1, 2, 3])`,
      result: (() => {
        const permutations = (arr: any[]): any[][] => {
          if (arr.length <= 1) return [arr];
          return arr.flatMap((val, i) => 
            permutations([...arr.slice(0, i), ...arr.slice(i + 1)])
              .map(perm => [val, ...perm])
          );
        };
        return permutations([1, 2, 3]);
      })(),
      explanation: "Recursive function generates all possible arrangements using flatMap()"
    },
    {
      title: "Array Combinations",
      description: "Generate combinations of specified size",
      code: `const combinations = (arr, k) => {
  if (k === 0) return [[]];
  if (k > arr.length) return [];
  return arr.flatMap((val, i) => 
    combinations(arr.slice(i + 1), k - 1)
      .map(combo => [val, ...combo])
  );
};
const combos = combinations([1, 2, 3, 4], 2)`,
      result: (() => {
        const combinations = (arr: any[], k: number): any[][] => {
          if (k === 0) return [[]];
          if (k > arr.length) return [];
          return arr.flatMap((val, i) => 
            combinations(arr.slice(i + 1), k - 1)
              .map(combo => [val, ...combo])
          );
        };
        return combinations([1, 2, 3, 4], 2);
      })(),
      explanation: "Recursive function generates combinations of specified size"
    },
    {
      title: "Array Intersection with Count",
      description: "Find common elements with frequency tracking",
      code: `const intersectionWithCount = (a, b) => {
  const countB = b.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  
  return a.filter(val => {
    if (countB[val]) {
      countB[val]--;
      return true;
    }
    return false;
  });
};
const common = intersectionWithCount([1, 2, 2, 3], [2, 2, 3, 4])`,
      result: (() => {
        const intersectionWithCount = (a: any[], b: any[]) => {
          const countB = b.reduce((acc: any, val: any) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {});
          
          return a.filter(val => {
            if (countB[val]) {
              countB[val]--;
              return true;
            }
            return false;
          });
        };
        return intersectionWithCount([1, 2, 2, 3], [2, 2, 3, 4]);
      })(),
      explanation: "Counts elements in second array, then filters first array based on available counts"
    },
    {
      title: "Array Sliding Window",
      description: "Process array with sliding window",
      code: `const slidingWindow = (arr, size) => 
  Array.from({length: arr.length - size + 1}, (_, i) => 
    arr.slice(i, i + size)
  );
const windows = slidingWindow([1, 2, 3, 4, 5], 3)`,
      result: (() => {
        const slidingWindow = (arr: any[], size: number) => 
          Array.from({length: arr.length - size + 1}, (_, i) => 
            arr.slice(i, i + size)
          );
        return slidingWindow([1, 2, 3, 4, 5], 3);
      })(),
      explanation: "Array.from() creates windows of specified size, slice() extracts each window"
    },
    {
      title: "Array Reservoir Sampling",
      description: "Randomly sample k elements from array",
      code: `const reservoirSample = (arr, k) => {
  const sample = arr.slice(0, k);
  for (let i = k; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j < k) {
      sample[j] = arr[i];
    }
  }
  return sample;
};
const sample = reservoirSample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)`,
      result: (() => {
        const reservoirSample = (arr: any[], k: number) => {
          const sample = arr.slice(0, k);
          for (let i = k; i < arr.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            if (j < k) {
              sample[j] = arr[i];
            }
          }
          return sample;
        };
        return reservoirSample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
      })(),
      explanation: "Reservoir sampling algorithm for unbiased random sampling of k elements"
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
