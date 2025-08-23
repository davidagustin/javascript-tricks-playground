import React from 'react';
import CodeBlock from './CodeBlock';

const AdvancedTricks: React.FC = () => {
  return (
    <div className="tricks-container">
      <h2>🚀 Advanced JavaScript Patterns</h2>
      <p className="section-description">
        Master advanced JavaScript patterns including generators, proxies, async patterns, and functional programming techniques.
      </p>
      
      <div className="examples-grid">
        {/* Generator & Iterator Patterns */}
        <div className="example-card">
          <CodeBlock 
            title="Infinite Fibonacci Generator"
            description="Generate infinite Fibonacci sequence"
            code={`const fibonacci = function*() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
};

// Usage
const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1`}
            result="0, 1, 1, 2, 3, 5..."
            explanation="Generator function yields values indefinitely, maintaining state between calls."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Range Generator with Step"
            description="Generate range of numbers with custom step"
            code={`const range = function*(start, end, step = 1) {
  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    yield i;
  }
};

// Usage
[...range(0, 10, 2)]; // [0, 2, 4, 6, 8, 10]`}
            result="[0, 2, 4, 6, 8, 10]"
            explanation="Generator yields values in range with specified step, handles both positive and negative steps."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Cycle Through Values"
            description="Infinite cycle through array values"
            code={`const cycle = function*(arr) {
  while (true) yield* arr;
};

// Usage
const colors = cycle(['red', 'green', 'blue']);
colors.next().value; // 'red'
colors.next().value; // 'green'
colors.next().value; // 'blue'
colors.next().value; // 'red' (cycles back)`}
            result="'red', 'green', 'blue', 'red'..."
            explanation="yield* delegates to another generator or iterable, creating infinite cycle."
          />
        </div>

        {/* Proxy Patterns */}
        <div className="example-card">
          <CodeBlock 
            title="Auto-Save Object"
            description="Automatically save object changes"
            code={`const autoSave = (obj, save) => new Proxy(obj, {
  set(target, prop, value) {
    target[prop] = value;
    save(target);
    return true;
  }
});

// Usage
const user = autoSave({name: 'John'}, (data) => {
  console.log('Saving:', data);
});
user.age = 30; // Triggers save`}
            result="Saving: {name: 'John', age: 30}"
            explanation="Proxy intercepts property assignments and calls save function automatically."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Case-Insensitive Object"
            description="Object with case-insensitive property access"
            code={`const caseInsensitive = obj => new Proxy(obj, {
  get: (target, prop) => {
    const key = Object.keys(target).find(k => 
      k.toLowerCase() === prop.toLowerCase()
    );
    return target[key];
  },
  set: (target, prop, value) => {
    const key = Object.keys(target).find(k => 
      k.toLowerCase() === prop.toLowerCase()
    ) || prop;
    target[key] = value;
    return true;
  }
});

// Usage
const user = caseInsensitive({name: 'John'});
user.NAME; // 'John'
user.Name = 'Jane'; // Updates existing property`}
            result="'John'"
            explanation="Proxy intercepts get/set operations and finds matching keys case-insensitively."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Negative Array Indices"
            description="Access array elements with negative indices"
            code={`const arr = new Proxy([1, 2, 3, 4, 5], {
  get(target, prop) {
    if (!isNaN(prop)) {
      const index = Number(prop);
      return target[index < 0 ? target.length + index : index];
    }
    return target[prop];
  }
});

// Usage
arr[-1]; // 5
arr[-2]; // 4`}
            result="5"
            explanation="Proxy converts negative indices to positive by adding array length."
          />
        </div>

        {/* Advanced Async Patterns */}
        <div className="example-card">
          <CodeBlock 
            title="Async Queue with Concurrency Limit"
            description="Process async tasks with limited concurrency"
            code={`const queue = (concurrency = 1) => {
  let running = 0;
  const queue = [];
  
  return fn => new Promise((resolve, reject) => {
    queue.push({fn, resolve, reject});
    
    const run = async () => {
      if (running >= concurrency || !queue.length) return;
      running++;
      
      const {fn, resolve, reject} = queue.shift();
      try {
        resolve(await fn());
      } catch(e) {
        reject(e);
      } finally {
        running--;
        run();
      }
    };
    
    run();
  });
};

// Usage
const asyncQueue = queue(2);
const tasks = [1, 2, 3, 4, 5].map(n => 
  () => new Promise(r => setTimeout(() => r(n * 2), 100))
);
Promise.all(tasks.map(task => asyncQueue(task)));`}
            result="[2, 4, 6, 8, 10]"
            explanation="Maintains queue of tasks and processes them with limited concurrency."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Retry with Exponential Backoff"
            description="Retry failed operations with increasing delays"
            code={`const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }
};

// Usage
const unreliableFn = () => Math.random() > 0.5 ? Promise.resolve('success') : Promise.reject('fail');
retryWithBackoff(unreliableFn);`}
            result="'success' or throws after retries"
            explanation="Exponential backoff reduces server load and handles transient failures."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Parallel Map with Limit"
            description="Process array items in parallel with concurrency limit"
            code={`const mapLimit = async (arr, limit, fn) => {
  const results = [];
  const executing = [];
  
  for (const [index, item] of arr.entries()) {
    const p = Promise.resolve().then(() => fn(item, index));
    results.push(p);
    
    if (arr.length >= limit) {
      executing.push(p);
      if (executing.length >= limit) {
        await Promise.race(executing);
        executing.splice(executing.findIndex(e => e === p), 1);
      }
    }
  }
  
  return Promise.all(results);
};

// Usage
const items = [1, 2, 3, 4, 5];
const process = async (n) => {
  await new Promise(r => setTimeout(r, 100));
  return n * 2;
};
mapLimit(items, 2, process);`}
            result="[2, 4, 6, 8, 10]"
            explanation="Processes items in parallel but limits concurrent executions."
          />
        </div>

        {/* Functional Programming Patterns */}
        <div className="example-card">
          <CodeBlock 
            title="Function Composition"
            description="Compose multiple functions together"
            code={`const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

// Usage
const add1 = x => x + 1;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const composed = compose(subtract3, multiply2, add1);
const piped = pipe(add1, multiply2, subtract3);

composed(5); // ((5+1)*2)-3 = 9
piped(5);    // ((5+1)*2)-3 = 9`}
            result="9"
            explanation="Compose executes right-to-left, pipe executes left-to-right."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Partial Application"
            description="Create new functions with some arguments pre-filled"
            code={`const partial = (fn, ...args) => (...rest) => fn(...args, ...rest);
const partialRight = (fn, ...args) => (...rest) => fn(...rest, ...args);

// Usage
const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
const addToEnd = partialRight(add, 10);

add5(3, 2);     // 5 + 3 + 2 = 10
addToEnd(1, 2); // 1 + 2 + 10 = 13`}
            result="10"
            explanation="Creates new functions with some arguments already bound."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Throttle Function"
            description="Limit function execution frequency"
            code={`const throttle = (fn, delay) => {
  let last = 0;
  let timer = null;
  
  return (...args) => {
    const now = Date.now();
    
    if (now - last >= delay) {
      fn(...args);
      last = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
        last = Date.now();
      }, delay - (now - last));
    }
  };
};

// Usage
const expensiveFn = () => console.log('Executed');
const throttled = throttle(expensiveFn, 1000);
// Only executes once per second maximum`}
            result="Executes at most once per second"
            explanation="Ensures function doesn't execute more frequently than specified delay."
          />
        </div>

        {/* Advanced String Processing */}
        <div className="example-card">
          <CodeBlock 
            title="Template Literal Tag for Cleaning"
            description="Clean and normalize template literals"
            code={`const clean = (strings, ...values) => {
  return strings.reduce((acc, str, i) => 
    acc + str + (values[i] ?? ''), ''
  ).replace(/\\s+/g, ' ').trim();
};

// Usage
const name = '  John  ';
const age = 30;
const result = clean\`Hello \${name}, you are \${age} years old\`;
// "Hello John, you are 30 years old"`}
            result="Hello John, you are 30 years old"
            explanation="Tag function processes template literal and normalizes whitespace."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Caesar Cipher"
            description="Simple text encryption/decryption"
            code={`const caesar = (str, shift) => {
  return str.replace(/[a-z]/gi, c => {
    const base = c < 'a' ? 65 : 97;
    return String.fromCharCode(
      ((c.charCodeAt(0) - base + shift + 26) % 26) + base
    );
  });
};

// Usage
const encrypted = caesar('hello', 3);  // 'khoor'
const decrypted = caesar('khoor', -3); // 'hello'`}
            result="'khoor'"
            explanation="Shifts each letter by specified amount, wrapping around alphabet."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="String Similarity (Dice Coefficient)"
            description="Calculate similarity between two strings"
            code={`const similarity = (s1, s2) => {
  const bigrams = s => {
    return [...Array(s.length - 1)].map((_, i) => s.slice(i, i + 2));
  };
  
  const b1 = new Set(bigrams(s1));
  const b2 = new Set(bigrams(s2));
  
  const intersection = [...b1].filter(x => b2.has(x)).length;
  return (2 * intersection) / (b1.size + b2.size);
};

// Usage
similarity('night', 'nite'); // 0.75`}
            result="0.75"
            explanation="Compares character bigrams to calculate similarity score between 0 and 1."
          />
        </div>

        {/* Advanced Math & Statistics */}
        <div className="example-card">
          <CodeBlock 
            title="Standard Deviation"
            description="Calculate standard deviation of array"
            code={`const stdDev = arr => {
  const mean = arr.reduce((a, b) => a + b) / arr.length;
  const variance = arr.reduce((acc, val) => 
    acc + Math.pow(val - mean, 2), 0
  ) / arr.length;
  return Math.sqrt(variance);
};

// Usage
const data = [2, 4, 4, 4, 5, 5, 7, 9];
stdDev(data);`}
            result="2.0"
            explanation="Calculates population standard deviation using mean and variance."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Moving Average"
            description="Calculate moving average over window"
            code={`const movingAvg = (arr, window) => {
  return arr.map((_, i, a) => {
    const slice = a.slice(Math.max(0, i - window + 1), i + 1);
    return slice.reduce((sum, n) => sum + n, 0) / slice.length;
  });
};

// Usage
const data = [1, 2, 3, 4, 5, 6, 7, 8];
movingAvg(data, 3);`}
            result="[1, 1.5, 2, 3, 4, 5, 6, 7]"
            explanation="Calculates average over sliding window of specified size."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Combinations Generator"
            description="Generate all combinations of size k"
            code={`const combinations = (arr, k) => {
  if (k === 0) return [[]];
  if (k > arr.length) return [];
  
  return arr.flatMap((val, i) => 
    combinations(arr.slice(i + 1), k - 1)
      .map(c => [val, ...c])
  );
};

// Usage
const items = ['a', 'b', 'c'];
combinations(items, 2);`}
            result="[['a', 'b'], ['a', 'c'], ['b', 'c']]"
            explanation="Recursively generates all possible combinations of specified size."
          />
        </div>

        {/* Browser & DOM Advanced */}
        <div className="example-card">
          <CodeBlock 
            title="Element Visibility Observer"
            description="Observe when element becomes visible"
            code={`const onVisible = (el, callback) => {
  return new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio > 0) {
      callback(entry);
    }
  }).observe(el);
};

// Usage
const element = document.querySelector('.my-element');
onVisible(element, (entry) => {
  console.log('Element is visible!', entry.intersectionRatio);
});`}
            result="Triggers when element becomes visible"
            explanation="Uses Intersection Observer API to detect when element enters viewport."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Smooth Scroll to Element"
            description="Smoothly scroll to element with offset"
            code={`const scrollTo = (el, offset = 0) => {
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + window.scrollY - offset;
  
  window.scrollTo({
    top: targetY,
    behavior: 'smooth'
  });
};

// Usage
const element = document.querySelector('#target');
scrollTo(element, 100); // Scroll with 100px offset`}
            result="Smoothly scrolls to element"
            explanation="Calculates target position and uses smooth scrolling behavior."
          />
        </div>

        {/* Memory & Performance */}
        <div className="example-card">
          <CodeBlock 
            title="Object Pool Pattern"
            description="Reuse objects to reduce garbage collection"
            code={`const createPool = (factory, reset) => {
  const pool = [];
  
  return {
    acquire: () => pool.pop() || factory(),
    release: obj => {
      reset(obj);
      pool.push(obj);
    }
  };
};

// Usage
const pool = createPool(
  () => ({ x: 0, y: 0, active: false }),
  obj => { obj.x = 0; obj.y = 0; obj.active = false; }
);

const obj1 = pool.acquire();
const obj2 = pool.acquire();
pool.release(obj1);`}
            result="Reuses objects from pool"
            explanation="Reduces memory allocation by reusing objects instead of creating new ones."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Lazy Property"
            description="Compute property value only when first accessed"
            code={`const lazy = (obj, prop, fn) => {
  Object.defineProperty(obj, prop, {
    get() {
      const value = fn();
      Object.defineProperty(this, prop, { value });
      return value;
    },
    configurable: true
  });
};

// Usage
const user = { name: 'John' };
lazy(user, 'expensive', () => {
  console.log('Computing expensive property...');
  return 'Computed Value';
});

// Property computed only when accessed
user.expensive;`}
            result="Computing expensive property...\nComputed Value"
            explanation="Property is computed only on first access, then cached for subsequent accesses."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Weak Memoization"
            description="Memoize with weak references to avoid memory leaks"
            code={`const weakMemo = fn => {
  const cache = new WeakMap();
  
  return arg => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

// Usage
const expensiveCalculation = weakMemo(obj => {
  console.log('Computing for:', obj);
  return obj.value * 2;
});

const obj1 = { value: 5 };
const obj2 = { value: 10 };

expensiveCalculation(obj1); // Computes
expensiveCalculation(obj1); // Cached
expensiveCalculation(obj2); // Computes`}
            result="Computing for: {value: 5}\nComputing for: {value: 10}"
            explanation="Uses WeakMap to cache results without preventing garbage collection of arguments."
          />
        </div>

        {/* Validation & Testing */}
        <div className="example-card">
          <CodeBlock 
            title="Deep Equality Check"
            description="Compare objects and arrays deeply"
            code={`const deepEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.constructor !== b.constructor) return false;
  
  if (a.constructor === Array) {
    return a.length === b.length && 
           a.every((val, i) => deepEqual(val, b[i]));
  }
  
  if (a.constructor === Object) {
    const keys = Object.keys(a);
    return keys.length === Object.keys(b).length && 
           keys.every(k => deepEqual(a[k], b[k]));
  }
  
  return false;
};

// Usage
const obj1 = { a: [1, 2, { x: 3 }] };
const obj2 = { a: [1, 2, { x: 3 }] };
deepEqual(obj1, obj2);`}
            result="true"
            explanation="Recursively compares nested objects and arrays for structural equality."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Schema Validator"
            description="Validate object against schema"
            code={`const validate = (obj, schema) => {
  return Object.entries(schema).every(([key, type]) => {
    const value = obj[key];
    if (type === 'array') return Array.isArray(value);
    if (type === 'object') return value && typeof value === 'object' && !Array.isArray(value);
    return typeof value === type;
  });
};

// Usage
const user = { name: 'John', age: 30, tags: ['dev', 'js'] };
const schema = { name: 'string', age: 'number', tags: 'array' };
validate(user, schema);`}
            result="true"
            explanation="Validates object properties against expected types defined in schema."
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedTricks;
