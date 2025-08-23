import React from 'react';
import CodeBlock from './CodeBlock';

const FunctionalTricks: React.FC = () => {
  return (
    <div className="tricks-container">
      <h2>⚡ Functional Programming</h2>
      <p className="section-description">
        Higher-order functions, functional patterns, and pure function techniques for clean, maintainable code.
      </p>
      
      <div className="examples-grid">
        <div className="example-card">
          <CodeBlock 
            title="Currying Function"
            code="const curry = (fn: Function) => {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs: any[]) => curried(...args, ...moreArgs);
  };
};

const add = curry((a, b, c) => a + b + c);
const add5 = add(5);
const add5And3 = add5(3);"
            result="Curried function that can be called partially"
            explanation="Transforms function to accept arguments one at a time, enabling partial application"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Compose Functions"
            code="const compose = (...fns) => 
  fns.reduce((f, g) => (...args) => f(g(...args)));

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(addOne, double, square);
// composed(3) = addOne(double(square(3))) = addOne(double(9)) = addOne(18) = 19"
            result="Function composition: f(g(h(x)))"
            explanation="Combines multiple functions into a single function, executing from right to left"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Pipe Functions"
            code="const pipe = (...fns) => 
  fns.reduce((f, g) => (...args) => g(f(...args)));

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const piped = pipe(addOne, double, square);
// piped(3) = square(double(addOne(3))) = square(double(4)) = square(8) = 64"
            result="Function piping: h(g(f(x)))"
            explanation="Combines multiple functions into a single function, executing from left to right"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Partial Application"
            code="const partial = (fn, ...presetArgs) => {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
};

const add = (a, b, c) => a + b + c;
const addToTen = partial(add, 10);
const result = addToTen(5, 3); // 18"
            result="Partially applied function with preset arguments"
            explanation="Creates a new function with some arguments already set"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Memoization with Cache"
            code="const memoize = (fn: Function) => {
  const cache = new Map();
  return function(...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    console.log('Computing...');
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const expensive = memoize((n) => n * n * n);"
            result="Function with intelligent caching"
            explanation="Caches function results based on input arguments to avoid redundant calculations"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Trampoline for Recursion"
            code="const trampoline = (fn) => {
  return (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
};

const factorial = trampoline((n, acc = 1) => {
  if (n <= 1) return acc;
  return () => factorial(n - 1, n * acc);
});"
            result="Tail-recursive function that won't stack overflow"
            explanation="Converts recursive calls to iterative loops to prevent stack overflow"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Monad-like Maybe"
            code="const Maybe = (value) => ({
  map: (fn) => value === null || value === undefined 
    ? Maybe(null) 
    : Maybe(fn(value)),
  flatMap: (fn) => value === null || value === undefined 
    ? Maybe(null) 
    : fn(value),
  getOrElse: (defaultValue) => value === null || value === undefined 
    ? defaultValue 
    : value
});

const safeDivide = (a, b) => Maybe(b === 0 ? null : a / b);"
            result="Safe computation with null/undefined handling"
            explanation="Provides safe operations that handle null/undefined values gracefully"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Either for Error Handling"
            code="const Either = {
  Left: (value) => ({
    map: () => Either.Left(value),
    flatMap: () => Either.Left(value),
    fold: (leftFn, rightFn) => leftFn(value)
  }),
  Right: (value) => ({
    map: (fn) => Either.Right(fn(value)),
    flatMap: (fn) => fn(value),
    fold: (leftFn, rightFn) => rightFn(value)
  })
};

const safeParse = (json) => {
  try {
    return Either.Right(JSON.parse(json));
  } catch (error) {
    return Either.Left(error.message);
  }
};"
            result="Functional error handling with Either type"
            explanation="Represents success (Right) or failure (Left) in a functional way"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Lazy Evaluation"
            code="const lazy = (fn) => {
  let evaluated = false;
  let result;
  return () => {
    if (!evaluated) {
      result = fn();
      evaluated = true;
    }
    return result;
  };
};

const expensiveComputation = lazy(() => {
  console.log('Computing...');
  return 42;
});"
            result="Lazy evaluation function"
            explanation="Delays computation until the result is actually needed"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Function Composition with Reduce"
            code="const compose = (...fns) => 
  fns.reduce((f, g) => (...args) => f(g(...args)));

const map = (fn) => (arr) => arr.map(fn);
const filter = (predicate) => (arr) => arr.filter(predicate);
const reduce = (fn, initial) => (arr) => arr.reduce(fn, initial);

const processData = compose(
  reduce((sum, x) => sum + x, 0),
  filter(x => x > 0),
  map(x => x * 2)
);"
            result="Composable data processing pipeline"
            explanation="Creates reusable, composable data transformation functions"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Point-Free Style"
            code="const prop = (key) => (obj) => obj[key];
const add = (a) => (b) => a + b;
const multiply = (a) => (b) => a * b;

const users = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];
const getNames = users.map(prop('name'));
const addTen = add(10);
const double = multiply(2);"
            result="Point-free function composition"
            explanation="Functions that don't explicitly mention their arguments, enabling better composition"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Function Decorator"
            code="const withLogging = (fn) => {
  return (...args) => {
    console.log(`Calling ${fn.name} with:`, args);
    const result = fn(...args);
    console.log(`${fn.name} returned:`, result);
    return result;
  };
};

const add = withLogging((a, b) => a + b);
const result = add(5, 3);"
            result="Function with automatic logging"
            explanation="Wraps functions with additional behavior without modifying the original function"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Immutable Update"
            code="const update = (obj, path, value) => {
  const keys = path.split('.');
  const newObj = { ...obj };
  let current = newObj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return newObj;
};

const user = { name: 'John', address: { city: 'NYC' } };
const updated = update(user, 'address.city', 'LA');"
            result="Immutable object update with nested paths"
            explanation="Creates new objects instead of mutating existing ones"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Function Overloading"
            code="const overload = (fns) => {
  return (...args) => {
    const fn = fns.find(f => f.length === args.length);
    if (!fn) {
      throw new Error(`No function found for ${args.length} arguments`);
    }
    return fn(...args);
  };
};

const process = overload([
  (x) => `Single: ${x}`,
  (x, y) => `Double: ${x}, ${y}`,
  (x, y, z) => `Triple: ${x}, ${y}, ${z}`
]);"
            result="Function with multiple signatures"
            explanation="Creates functions that behave differently based on argument count"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Lens for Immutable Updates"
            code="const lens = (getter, setter) => ({
  get: getter,
  set: setter,
  over: (obj, fn) => setter(obj, fn(getter(obj)))
});

const propLens = (key) => lens(
  (obj) => obj[key],
  (obj, value) => ({ ...obj, [key]: value })
);

const user = { name: 'John', age: 30 };
const nameLens = propLens('name');
const updated = nameLens.over(user, name => name.toUpperCase());"
            result="Lens for focused immutable updates"
            explanation="Provides a way to focus on specific parts of data structures for updates"
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionalTricks;
