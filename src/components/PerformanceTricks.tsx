import React from 'react';
import CodeBlock from './CodeBlock';

const PerformanceTricks: React.FC = () => {
  const performanceExamples = [
    {
      title: "Debounce Function",
      description: "Limit function execution frequency",
      code: `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
const debouncedSearch = debounce((query) => console.log('Searching:', query), 300);`,
      result: "Function returned (debounced version)",
      explanation: "Prevents excessive function calls by delaying execution until user stops typing"
    },
    {
      title: "Throttle Function",
      description: "Execute function at most once per time period",
      code: `const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
const throttledScroll = throttle(() => console.log('Scrolled!'), 100);`,
      result: "Function returned (throttled version)",
      explanation: "Ensures function runs at most once per specified time interval"
    },
    {
      title: "Memoization",
      description: "Cache expensive function results",
      code: `const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
const expensiveFn = memoize((n) => {
  console.log('Computing...');
  return n * n;
});`,
      result: "Function returned (memoized version)",
      explanation: "Stores function results in cache to avoid recalculating same inputs"
    },
    {
      title: "Weak Memoization",
      description: "Memory-safe memoization for objects",
      code: `const weakMemoize = (fn) => {
  const cache = new WeakMap();
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};
const processObject = weakMemoize((obj) => {
  console.log('Processing object...');
  return Object.keys(obj).length;
});`,
      result: "Function returned (weak memoized version)",
      explanation: "Uses WeakMap to allow garbage collection of cached objects"
    },
    {
      title: "Lazy Loading",
      description: "Load resources only when needed",
      code: `const lazyLoad = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
};
const loadImage = lazyLoad('https://via.placeholder.com/300x200');`,
      result: "Promise {<pending>}",
      explanation: "Loads images or other resources only when they're about to be viewed"
    },
    {
      title: "Virtual Scrolling",
      description: "Render only visible items",
      code: `const virtualScroll = (items, itemHeight, containerHeight) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const scrollTop = 0; // Would be from scroll event
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);
  return items.slice(startIndex, endIndex);
};`,
      result: "Function returned",
      explanation: "Only renders items currently visible in viewport for large lists"
    },
    {
      title: "Web Workers",
      description: "Run heavy tasks in background thread",
      code: `// Main thread
const worker = new Worker('worker.js');
worker.postMessage({data: [1,2,3,4,5]});
worker.onmessage = (e) => console.log('Result:', e.data);

// worker.js
self.onmessage = (e) => {
  const result = e.data.data.reduce((a, b) => a + b, 0);
  self.postMessage(result);
};`,
      result: "Worker created",
      explanation: "Moves CPU-intensive tasks to background thread to keep UI responsive"
    },
    {
      title: "Request Animation Frame",
      description: "Optimize animations and visual updates",
      code: `const smoothAnimation = () => {
  let start = null;
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    // Update animation here
    if (progress < 1000) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};`,
      result: "Function returned",
      explanation: "Synchronizes animations with browser's refresh rate for smooth performance"
    },
    {
      title: "Memory Leak Prevention",
      description: "Clean up event listeners and references",
      code: `class EventManager {
  constructor() {
    this.listeners = new Map();
  }
  
  add(element, event, handler) {
    element.addEventListener(event, handler);
    this.listeners.set(handler, {element, event});
  }
  
  remove(handler) {
    const listener = this.listeners.get(handler);
    if (listener) {
      listener.element.removeEventListener(listener.event, handler);
      this.listeners.delete(handler);
    }
  }
  
  cleanup() {
    this.listeners.forEach((listener, handler) => {
      listener.element.removeEventListener(listener.event, handler);
    });
    this.listeners.clear();
  }
}`,
      result: "Class defined",
      explanation: "Properly manages event listeners to prevent memory leaks"
    },
    {
      title: "Performance Monitoring",
      description: "Measure execution time and memory usage",
      code: `const performanceMonitor = {
  time(label) {
    console.time(label);
    return () => console.timeEnd(label);
  },
  
  memory() {
    if (performance.memory) {
      const mem = performance.memory;
      return {
        used: Math.round(mem.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(mem.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(mem.jsHeapSizeLimit / 1048576) + ' MB'
      };
    }
    return 'Memory API not available';
  }
};`,
      result: "Object defined",
      explanation: "Tools to measure and monitor application performance"
    },
    {
      title: "Code Splitting",
      description: "Load code on demand",
      code: `// Dynamic import for code splitting
const loadModule = async (moduleName) => {
  try {
    const module = await import(\`./modules/\${moduleName}.js\`);
    return module.default;
  } catch (error) {
    console.error('Failed to load module:', error);
  }
};

// Usage
const heavyComponent = await loadModule('HeavyComponent');`,
      result: "Function returned",
      explanation: "Loads JavaScript modules only when needed, reducing initial bundle size"
    },
    {
      title: "Intersection Observer",
      description: "Efficiently detect element visibility",
      code: `const observeVisibility = (element, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  });
  observer.observe(element);
  return observer;
};`,
      result: "Function returned",
      explanation: "Efficiently detects when elements enter/exit viewport without scroll events"
    },
    {
      title: "Object Pool Pattern",
      description: "Reuse objects to reduce garbage collection",
      code: `class ObjectPool {
  constructor(factory, reset) {
    this.factory = factory;
    this.reset = reset;
    this.pool = [];
  }
  
  acquire() {
    return this.pool.pop() || this.factory();
  }
  
  release(obj) {
    this.reset(obj);
    this.pool.push(obj);
  }
}

const pool = new ObjectPool(
  () => ({ x: 0, y: 0, active: false }),
  (obj) => { obj.x = 0; obj.y = 0; obj.active = false; }
);`,
      result: "Class defined",
      explanation: "Reuses objects to minimize garbage collection overhead"
    },
    {
      title: "Lazy Property",
      description: "Initialize properties only when accessed",
      code: `const lazyProperty = (obj, prop, factory) => {
  Object.defineProperty(obj, prop, {
    get() {
      const value = factory();
      Object.defineProperty(this, prop, { value });
      return value;
    },
    configurable: true
  });
};

const config = {};
lazyProperty(config, 'expensive', () => {
  console.log('Computing expensive value...');
  return Math.random() * 1000;
});`,
      result: "Property defined",
      explanation: "Initializes expensive properties only when first accessed"
    },
    {
      title: "Chunk Processing",
      description: "Process large arrays in chunks",
      code: `const chunkProcess = async (items, chunkSize, processFn) => {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    await Promise.all(chunk.map(processFn));
    
    // Allow other tasks to run
    await new Promise(resolve => setTimeout(resolve, 0));
  }
};

const largeArray = Array.from({length: 10000}, (_, i) => i);
chunkProcess(largeArray, 100, async (item) => {
  // Process each item
  await new Promise(resolve => setTimeout(resolve, 1));
});`,
      result: "Function returned",
      explanation: "Processes large datasets in chunks to prevent blocking the main thread"
    },
    {
      title: "Performance Budget",
      description: "Monitor and enforce performance budgets",
      code: `class PerformanceBudget {
  constructor(budget) {
    this.budget = budget;
    this.metrics = new Map();
  }
  
  start(label) {
    this.metrics.set(label, performance.now());
  }
  
  end(label) {
    const start = this.metrics.get(label);
    if (start) {
      const duration = performance.now() - start;
      const budget = this.budget[label];
      
      if (budget && duration > budget) {
        console.warn(\`Performance budget exceeded for \${label}: \${duration}ms > \${budget}ms\`);
      }
      
      this.metrics.delete(label);
      return duration;
    }
  }
}

const budget = new PerformanceBudget({
  'data-processing': 100,
  'rendering': 16
});`,
      result: "Class defined",
      explanation: "Monitors performance against predefined budgets"
    },
    {
      title: "Request Idle Callback",
      description: "Execute tasks during idle time",
      code: `const idleTask = (task, timeout = 1000) => {
  if ('requestIdleCallback' in window) {
    return new Promise((resolve) => {
      requestIdleCallback(() => {
        const result = task();
        resolve(result);
      }, { timeout });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = task();
        resolve(result);
      }, 0);
    });
  }
};

idleTask(() => {
  console.log('Running during idle time...');
  return 'Task completed';
});`,
      result: "Promise {<pending>}",
      explanation: "Executes tasks during browser idle time to avoid blocking the main thread"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>⚡ Performance & Debugging</h2>
      <p className="section-description">
        Optimize your JavaScript applications with these performance tricks and debugging techniques.
      </p>

      <div className="examples-grid">
        {performanceExamples.map((example, index) => (
          <div key={index} className="example-card">
            <CodeBlock {...example} category="performance" />
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3>💡 Performance Tips</h3>
        <ul>
          <li><strong>Debounce vs Throttle:</strong> Use debounce for search, throttle for scroll events</li>
          <li><strong>Memory Management:</strong> Always clean up event listeners and timers</li>
          <li><strong>Lazy Loading:</strong> Load resources only when needed</li>
          <li><strong>Web Workers:</strong> Move heavy computations to background threads</li>
          <li><strong>Virtual Scrolling:</strong> Essential for large lists (1000+ items)</li>
          <li><strong>Code Splitting:</strong> Reduce initial bundle size with dynamic imports</li>
          <li><strong>Object Pooling:</strong> Reuse objects to reduce garbage collection</li>
          <li><strong>Performance Budgets:</strong> Set and monitor performance targets</li>
          <li><strong>Idle Callbacks:</strong> Execute non-critical tasks during idle time</li>
          <li><strong>Weak References:</strong> Use WeakMap/WeakSet for memory-safe caching</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceTricks;
