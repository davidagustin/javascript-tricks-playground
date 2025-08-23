import React from 'react';
import CodeBlock from './CodeBlock';

const ObjectTricks: React.FC = () => {
  const objectExamples = [
    {
      title: "Swap Variables",
      description: "Swap two variables without temporary variable",
      code: `let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b)`,
      result: (() => {
        let a = 1, b = 2;
        [a, b] = [b, a];
        return { a, b };
      })(),
      explanation: "Array destructuring assignment swaps values in one line"
    },
    {
      title: "Clone Object (Shallow)",
      description: "Create shallow copy of object",
      code: "const clone = {...original}",
      result: (() => {
        const original = { name: 'John', age: 30 };
        const clone = { ...original };
        return { original, clone, isEqual: original === clone };
      })(),
      explanation: "Spread operator (...) creates new object with same properties"
    },
    {
      title: "Clone Object (Deep)",
      description: "Deep clone object using JSON",
      code: "const deepClone = JSON.parse(JSON.stringify(obj))",
      result: (() => {
        const original = { name: 'John', details: { age: 30, city: 'NYC' } };
        const deepClone = JSON.parse(JSON.stringify(original));
        return { original, deepClone, isEqual: original === deepClone };
      })(),
      explanation: "JSON.stringify() converts to string, JSON.parse() converts back - creates completely new object"
    },
    {
      title: "Dynamic Property Names",
      description: "Use variables as object property names",
      code: `const prop = 'name';
const obj = { [prop]: 'value' }`,
      result: (() => {
        const prop = 'name';
        const obj = { [prop]: 'value' };
        return obj;
      })(),
      explanation: "Computed property names use square brackets to evaluate expression as property name"
    },
    {
      title: "Object from Entries",
      description: "Create object from array of key-value pairs",
      code: "const obj = Object.fromEntries([['a', 1], ['b', 2]])",
      result: Object.fromEntries([['a', 1], ['b', 2]]),
      explanation: "Object.fromEntries() converts array of [key, value] pairs to object"
    },
    {
      title: "Remove Property",
      description: "Remove property using destructuring",
      code: `const user = { name: 'John', age: 30, password: 'secret' };
const {password, ...userWithoutPassword} = user`,
      result: (() => {
        const user = { name: 'John', age: 30, password: 'secret' };
        const {password, ...userWithoutPassword} = user;
        return { userWithoutPassword, removedPassword: password };
      })(),
      explanation: "Destructuring with rest operator (...) extracts specific property and creates new object with remaining properties"
    },
    {
      title: "Merge Objects",
      description: "Merge multiple objects",
      code: "const merged = {...obj1, ...obj2, ...obj3}",
      result: (() => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const obj3 = { d: 5 };
        return { ...obj1, ...obj2, ...obj3 };
      })(),
      explanation: "Spread operator merges objects, later properties override earlier ones"
    },
    {
      title: "Pick Properties",
      description: "Extract specific properties from object",
      code: `const pick = (obj, keys) => Object.fromEntries(keys.map(key => [key, obj[key]]));
const result = pick({a: 1, b: 2, c: 3}, ['a', 'c'])`,
      result: (() => {
        const pick = (obj: any, keys: string[]) => Object.fromEntries(keys.map(key => [key, obj[key]]));
        return pick({a: 1, b: 2, c: 3}, ['a', 'c']);
      })(),
      explanation: "map() creates array of [key, value] pairs, Object.fromEntries() converts to object"
    },
    {
      title: "Omit Properties",
      description: "Create object without specific properties",
      code: `const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
const result = omit({a: 1, b: 2, c: 3}, ['b'])`,
      result: (() => {
        const omit = (obj: any, keys: string[]) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
        return omit({a: 1, b: 2, c: 3}, ['b']);
      })(),
      explanation: "Object.entries() converts to array, filter() removes unwanted keys, Object.fromEntries() converts back"
    },
    {
      title: "Flatten Nested Object",
      description: "Flatten nested object with dot notation",
      code: `const flatten = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
  const pre = prefix ? prefix + '.' : '';
  return obj[k]?.constructor === Object 
    ? {...acc, ...flatten(obj[k], pre + k)}
    : {...acc, [pre + k]: obj[k]};
}, {});
const result = flatten({a: {b: {c: 1}}})`,
      result: (() => {
        const flatten = (obj: any, prefix = ''): any => Object.keys(obj).reduce((acc, k) => {
          const pre = prefix ? prefix + '.' : '';
          return obj[k]?.constructor === Object 
            ? {...acc, ...flatten(obj[k], pre + k)}
            : {...acc, [pre + k]: obj[k]};
        }, {});
        return flatten({a: {b: {c: 1}}});
      })(),
      explanation: "Recursive function that checks if value is object, flattens nested objects with dot notation"
    },
    {
      title: "Invert Object",
      description: "Swap keys and values",
      code: `const invert = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
const result = invert({a: 1, b: 2})`,
      result: (() => {
        const invert = (obj: any) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
        return invert({a: 1, b: 2});
      })(),
      explanation: "Object.entries() gets [key, value] pairs, map() swaps them, Object.fromEntries() creates new object"
    },
    {
      title: "Deep Merge",
      description: "Deep merge objects recursively",
      code: `const deepMerge = (a, b) => Object.keys({...a, ...b}).reduce((acc, key) => ({
  ...acc,
  [key]: a[key]?.constructor === Object && b[key]?.constructor === Object 
    ? deepMerge(a[key], b[key]) 
    : b[key] ?? a[key]
}), {});
const result = deepMerge({a: {b: 1, c: 2}}, {a: {c: 3, d: 4}})`,
      result: (() => {
        const deepMerge = (a: any, b: any): any => Object.keys({...a, ...b}).reduce((acc, key) => ({
          ...acc,
          [key]: a[key]?.constructor === Object && b[key]?.constructor === Object 
            ? deepMerge(a[key], b[key]) 
            : b[key] ?? a[key]
        }), {});
        return deepMerge({a: {b: 1, c: 2}}, {a: {c: 3, d: 4}});
      })(),
      explanation: "Recursive merge that checks if both values are objects, merges them deeply, otherwise uses b value or a as fallback"
    },
    {
      title: "Group by Property",
      description: "Group array of objects by property",
      code: `const groupBy = (arr, key) => arr.reduce((acc, obj) => {
  const group = obj[key];
  acc[group] = acc[group] || [];
  acc[group].push(obj);
  return acc;
}, {});
const result = groupBy([
  {name: 'Alice', age: 25, city: 'NYC'},
  {name: 'Bob', age: 30, city: 'LA'},
  {name: 'Charlie', age: 25, city: 'NYC'}
], 'city')`,
      result: (() => {
        const groupBy = (arr: any[], key: string) => arr.reduce((acc, obj) => {
          const group = obj[key];
          acc[group] = acc[group] || [];
          acc[group].push(obj);
          return acc;
        }, {});
        return groupBy([
          {name: 'Alice', age: 25, city: 'NYC'},
          {name: 'Bob', age: 30, city: 'LA'},
          {name: 'Charlie', age: 25, city: 'NYC'}
        ], 'city');
      })(),
      explanation: "reduce() builds object where keys are property values and values are arrays of matching objects"
    },
    {
      title: "Check if Object is Empty",
      description: "Check if object has no properties",
      code: "const isEmpty = obj => !Object.keys(obj).length",
      result: (() => {
        const isEmpty = (obj: any) => !Object.keys(obj).length;
        return {
          empty: isEmpty({}),
          notEmpty: isEmpty({a: 1})
        };
      })(),
      explanation: "Object.keys() returns array of keys, check if length is 0"
    },
    {
      title: "Safe Property Access",
      description: "Safely access nested properties",
      code: `const get = (obj, path, defaultValue) => path.split('.').reduce((o, p) => o?.[p], obj) ?? defaultValue;
const result = get({a: {b: {c: 1}}}, 'a.b.c', 'default')`,
      result: (() => {
        const get = (obj: any, path: string, defaultValue: any) => path.split('.').reduce((o, p) => o?.[p], obj) ?? defaultValue;
        return get({a: {b: {c: 1}}}, 'a.b.c', 'default');
      })(),
      explanation: "split() creates path array, reduce() traverses object, optional chaining (?.) prevents errors, nullish coalescing (??) provides default"
    },
    {
      title: "Object Size",
      description: "Get number of properties in object",
      code: "const size = obj => Object.keys(obj).length",
      result: (() => {
        const size = (obj: any) => Object.keys(obj).length;
        return size({a: 1, b: 2, c: 3});
      })(),
      explanation: "Object.keys() returns array of keys, length gives count of properties"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>📦 Object Operations</h2>
      <p className="section-description">
        Master object manipulation with these powerful techniques and patterns.
      </p>

      <div className="examples-grid">
        {objectExamples.map((example, index) => (
          <div key={index} className="example-card">
            <CodeBlock {...example} />
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li><strong>Immutability:</strong> Use spread operator and Object.assign() to create new objects instead of mutating</li>
          <li><strong>Performance:</strong> Object.keys() is faster than for...in loops for getting property names</li>
          <li><strong>Deep Cloning:</strong> JSON.parse(JSON.stringify()) has limitations - doesn't handle functions, dates, or circular references</li>
          <li><strong>Property Access:</strong> Use optional chaining (?.) and nullish coalescing (??) for safe property access</li>
        </ul>
      </div>
    </div>
  );
};

export default ObjectTricks;
