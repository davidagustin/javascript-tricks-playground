import React from 'react';
import CodeBlock from './CodeBlock';

const AsyncTricks: React.FC = () => {
  return (
    <div className="tricks-container">
      <h2>⏱️ Async Operations</h2>
      <p className="section-description">
        Promise tricks, async patterns, and advanced asynchronous programming techniques.
      </p>
      
      <div className="examples-grid">
        <div className="example-card">
          <CodeBlock 
            title="Promise.all with Timeout"
            code="const promiseWithTimeout = (promise, timeout) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
};

const fetchWithTimeout = (url, timeout = 5000) => 
  promiseWithTimeout(fetch(url), timeout);"
            result="Promise that rejects after timeout"
            explanation="Wraps any promise with a timeout using Promise.race()"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Retry with Exponential Backoff"
            code="const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => 
      setTimeout(resolve, delay)
    );
    return retry(fn, retries - 1, delay * 2);
  }
};

const fetchWithRetry = (url) => 
  retry(() => fetch(url));"
            result="Function with automatic retry logic"
            explanation="Retries failed operations with exponentially increasing delays"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Queue"
            code="class AsyncQueue {
  constructor(concurrency = 1) {
    this.queue = [];
    this.running = 0;
    this.concurrency = concurrency;
  }
  
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }
  
  async run() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;
    
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
    
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.run();
    }
  }
}"
            result="Controlled concurrent async operations"
            explanation="Limits the number of concurrent async operations to prevent overwhelming the system"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Promise.allSettled with Filtering"
            code="const allSettled = async (promises) => {
  const results = await Promise.allSettled(promises);
  return {
    fulfilled: results.filter(r => r.status === 'fulfilled').map(r => r.value),
    rejected: results.filter(r => r.status === 'rejected').map(r => r.reason)
  };
};

const results = await allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success')
]);"
            result="Promise results grouped by status"
            explanation="Groups fulfilled and rejected promises separately for easier handling"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Generator"
            code="async function* asyncGenerator() {
  yield await fetch('/api/users');
  yield await fetch('/api/posts');
  yield await fetch('/api/comments');
}

const processData = async () => {
  for await (const response of asyncGenerator()) {
    const data = await response.json();
    console.log(data);
  }
};"
            result="Async generator for sequential processing"
            explanation="Processes async operations one at a time using async generators"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Promise Pool"
            code="const promisePool = async (tasks, poolSize) => {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= poolSize) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
};"
            result="Controlled promise execution pool"
            explanation="Executes promises in batches to control memory usage and concurrency"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Cache"
            code="const asyncCache = () => {
  const cache = new Map();
  
  return async (key, asyncFn) => {
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = asyncFn();
    cache.set(key, promise);
    
    try {
      const result = await promise;
      cache.set(key, result);
      return result;
    } catch (error) {
      cache.delete(key);
      throw error;
    }
  };
};"
            result="Async function result caching"
            explanation="Caches async function results and handles concurrent calls to the same key"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Debounced Async Function"
            code="const debounceAsync = (asyncFn, delay) => {
  let timeoutId;
  let pendingPromise;
  
  return async (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    if (pendingPromise) {
      return pendingPromise;
    }
    
    pendingPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await asyncFn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          pendingPromise = null;
        }
      }, delay);
    });
    
    return pendingPromise;
  };
};"
            result="Debounced async function with promise deduplication"
            explanation="Combines debouncing with promise deduplication for efficient async operations"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Event Emitter"
            code="class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(handler);
  }
  
  async emit(event, ...args) {
    const handlers = this.events.get(event) || [];
    return Promise.all(handlers.map(handler => handler(...args)));
  }
  
  off(event, handler) {
    const handlers = this.events.get(event) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}"
            result="Async event emitter with promise support"
            explanation="Event emitter that supports async event handlers and waits for all to complete"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Waterfall"
            code="const asyncWaterfall = async (tasks, initialValue) => {
  return tasks.reduce(async (previousPromise, task) => {
    const previousResult = await previousPromise;
    return task(previousResult);
  }, Promise.resolve(initialValue));
};

const result = await asyncWaterfall([
  async (value) => value + 1,
  async (value) => value * 2,
  async (value) => value + 10
], 5); // Result: 22"
            result="Sequential async operations with data flow"
            explanation="Executes async functions sequentially, passing the result of each to the next"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Promise.any with Fallback"
            code="const anyWithFallback = async (promises, fallback) => {
  try {
    return await Promise.any(promises);
  } catch (error) {
    if (error.name === 'AggregateError') {
      return fallback;
    }
    throw error;
  }
};

const result = await anyWithFallback([
  fetch('/api/primary'),
  fetch('/api/backup')
], { data: 'fallback data' });"
            result="Promise.any with fallback value"
            explanation="Uses Promise.any() with a fallback value when all promises reject"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Map with Concurrency"
            code="const asyncMap = async (items, asyncFn, concurrency = 1) => {
  const results = [];
  const executing = [];
  
  for (let i = 0; i < items.length; i++) {
    const promise = asyncFn(items[i], i).then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
};"
            result="Async map with controlled concurrency"
            explanation="Maps over items with async function while controlling concurrency"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Reduce"
            code="const asyncReduce = async (items, asyncFn, initialValue) => {
  let accumulator = initialValue;
  
  for (const item of items) {
    accumulator = await asyncFn(accumulator, item);
  }
  
  return accumulator;
};

const result = await asyncReduce(
  [1, 2, 3, 4],
  async (sum, num) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return sum + num;
  },
  0
);"
            result="Async reduce for sequential accumulation"
            explanation="Reduces items with async function, processing sequentially"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Filter"
            code="const asyncFilter = async (items, asyncPredicate) => {
  const results = [];
  
  for (const item of items) {
    if (await asyncPredicate(item)) {
      results.push(item);
    }
  }
  
  return results;
};

const filtered = await asyncFilter(
  [1, 2, 3, 4, 5],
  async (num) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return num % 2 === 0;
  }
);"
            result="Async filter for conditional filtering"
            explanation="Filters items using async predicate function"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Sleep"
            code="const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const delayedOperation = async () => {
  console.log('Starting...');
  await sleep(1000);
  console.log('After 1 second');
  await sleep(2000);
  console.log('After 2 more seconds');
};"
            result="Promise-based sleep function"
            explanation="Creates a promise that resolves after specified milliseconds"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Async Polling"
            code="const poll = async (condition, interval = 1000, timeout = 30000) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error('Polling timeout');
};

const waitForElement = () => poll(
  () => document.querySelector('.my-element') !== null,
  500,
  10000
);"
            result="Async polling with timeout"
            explanation="Polls a condition until it's true or timeout is reached"
          />
        </div>
      </div>
    </div>
  );
};

export default AsyncTricks;
