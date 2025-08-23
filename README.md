# 🚀 JavaScript Tricks & One-Liners Tutorial

A comprehensive interactive tutorial showcasing powerful JavaScript tricks, one-liners, and advanced patterns. Built with React and TypeScript.

## ✨ Features

### 🎯 **10 Comprehensive Categories**
- **⭐ Favorites** - Save and manage your favorite tricks
- **🔢 Array Manipulation** - Powerful array operations and transformations
- **📝 String Processing** - String manipulation and formatting tricks
- **📦 Object Operations** - Object manipulation and utility functions
- **🔢 Number Operations** - Mathematical operations and number formatting
- **⚡ Functional Programming** - Higher-order functions and functional patterns
- **🔄 Async Operations** - Promise tricks and async patterns
- **🌐 DOM Manipulation** - Browser DOM tricks and utilities
- **⚡ Performance & Debugging** - Performance optimization and debugging tricks
- **🏆 LeetCode Style** - Competitive programming and algorithm tricks
- **🚀 Advanced Patterns** - Complex patterns and advanced techniques

### 🔍 **Smart Search**
- Search across all trick categories by name or description
- Real-time filtering with instant results
- Clear search functionality

### ⭐ **Favorites System**
- Add tricks to your personal favorites
- Persistent storage using localStorage
- Quick access to your most-used tricks
- Remove individual favorites or clear all at once

### 📋 **Interactive Code Examples**
- Click-to-copy functionality for all code snippets
- Live execution and result display
- Detailed explanations for each trick
- Syntax highlighting

### 🎨 **Modern UI/UX**
- Beautiful gradient design
- Responsive grid layout
- Smooth animations and transitions
- Category-based navigation

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Custom styling with gradients and animations
- **LocalStorage** - Persistent favorites storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd javascript-tricks-playground
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 What You'll Learn

### 🔢 Array Manipulation (25+ tricks)
```javascript
// Remove duplicates with Set
const unique = [...new Set([1, 2, 2, 3, 4, 4])] // [1, 2, 3, 4]

// Flatten nested arrays
const flat = [1, [2, 3, [4, 5]]].flat(Infinity) // [1, 2, 3, 4, 5]

// Get random element
const random = arr[~~(Math.random() * arr.length)]

// Group by property
const groupBy = (arr, key) => arr.reduce((acc, obj) => (
  (acc[obj[key]] = acc[obj[key]] || []).push(obj), acc
), {})

// Partition array by condition
const partition = (arr, fn) => arr.reduce((acc, val) => 
  (acc[fn(val) ? 0 : 1].push(val), acc), [[], []])

// Zip multiple arrays
const zip = (...arrays) => Array.from({length: Math.max(...arrays.map(a => a.length))}, 
  (_, i) => arrays.map(a => a[i]))

// Cartesian product
const cartesian = (...sets) => sets.reduce((acc, set) => 
  acc.flatMap(x => set.map(y => [...x, y])), [[]])

// Run-length encoding
const encode = arr => arr.reduce((acc, val) => {
  const last = acc[acc.length - 1]
  return last?.[0] === val ? [...acc.slice(0, -1), [val, last[1] + 1]] : [...acc, [val, 1]]
}, [])

// Find all indices
const findIndices = (arr, fn) => arr.reduce((acc, val, i) => 
  fn(val) ? [...acc, i] : acc, [])

// Array intersection with count
const intersectWithCount = (a, b) => {
  const map = b.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map())
  return a.filter(x => map.get(x) && map.set(x, map.get(x) - 1))
}
```

### 📝 String Processing (30+ tricks)
```javascript
// Reverse string
const reversed = [...'hello'].reverse().join('') // 'olleh'

// Title case
const titleCase = str => str.replace(/\b\w/g, l => l.toUpperCase())

// Generate slug
const slugify = str => str.toLowerCase().trim()
  .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')

// Check palindrome
const isPalindrome = str => str === str.split('').reverse().join('')

// Caesar cipher
const caesar = (str, shift) => str.replace(/[a-z]/gi, c => 
  String.fromCharCode((c.charCodeAt(0) - (c < 'a' ? 65 : 97) + shift + 26) % 26 + (c < 'a' ? 65 : 97)))

// String similarity (Dice coefficient)
const similarity = (s1, s2) => {
  const bigrams = s => [...Array(s.length - 1)].map((_, i) => s.slice(i, i + 2))
  const b1 = new Set(bigrams(s1)), b2 = new Set(bigrams(s2))
  return (2 * [...b1].filter(x => b2.has(x)).length) / (b1.size + b2.size)
}

// Extract variables from template
const extract = (template, str) => {
  const regex = new RegExp(template.replace(/\${(\w+)}/g, '(?<$1>.*)'))
  return str.match(regex)?.groups || {}
}

// Template literal tag for cleaning
const clean = (strings, ...values) => strings.reduce((acc, str, i) => 
  acc + str + (values[i] ?? ''), '').replace(/\s+/g, ' ').trim()

// Phone number formatting
const formatPhone = s => s.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

// Credit card masking
const maskCard = card => card.slice(-4).padStart(card.length, '*')

// Truncate middle of string
const truncateMiddle = (str, maxLen) => 
  str.length <= maxLen ? str : 
  str.slice(0, maxLen/2 - 2) + '...' + str.slice(-(maxLen/2 - 1))
```

### 📦 Object Operations (25+ tricks)
```javascript
// Swap variables
[a, b] = [b, a]

// Deep merge objects
const deepMerge = (a, b) => Object.keys({...a, ...b}).reduce((acc, key) => ({
  ...acc, [key]: a[key]?.constructor === Object && b[key]?.constructor === Object 
    ? deepMerge(a[key], b[key]) : b[key] ?? a[key]
}), {})

// Safe property access
const get = (obj, path, def) => path.split('.').reduce((o, p) => o?.[p], obj) ?? def

// Invert object (swap keys/values)
const invert = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))

// Pick/Omit keys from object
const pick = (obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]))
const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))

// Flatten nested object
const flatten = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
  const pre = prefix ? `${prefix}.` : ''
  return obj[k]?.constructor === Object 
    ? {...acc, ...flatten(obj[k], pre + k)}
    : {...acc, [pre + k]: obj[k]}
}, {})

// Group by multiple keys
const groupByMultiple = (arr, ...keys) => arr.reduce((acc, obj) => {
  const key = keys.map(k => obj[k]).join('|')
  return {...acc, [key]: [...(acc[key] || []), obj]}
}, {})

// Object path setter
const set = (obj, path, value) => path.split('.').reduce((o, p, i, arr) => 
  o[p] = i === arr.length - 1 ? value : o[p] || {}, obj) && obj

// Deep equality check
const deepEqual = (a, b) => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.constructor !== b.constructor) return false
  if (a.constructor === Array) return a.length === b.length && a.every((val, i) => deepEqual(val, b[i]))
  if (a.constructor === Object) {
    const keys = Object.keys(a)
    return keys.length === Object.keys(b).length && keys.every(k => deepEqual(a[k], b[k]))
  }
  return false
}
```

### 🔢 Number & Math Operations (20+ tricks)
```javascript
// Round to decimal places
const rounded = Math.round(num * 100) / 100

// Random in range
const randomInRange = (min, max) => Math.random() * (max - min) + min

// Format currency
const money = n => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD'
}).format(n)

// GCD (Euclidean algorithm)
const gcd = (a, b) => b ? gcd(b, a % b) : a

// LCM
const lcm = (a, b) => a * b / gcd(a, b)

// Prime check
const isPrime = n => n > 1 && ![...Array(Math.sqrt(n) | 0)].slice(2).some(i => !(n % i))

// Fast power (binary exponentiation)
const pow = (base, exp) => exp === 0 ? 1 : exp % 2 ? base * pow(base, exp - 1) : pow(base * base, exp / 2)

// Standard deviation
const stdDev = arr => (mean => Math.sqrt(arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / arr.length))(arr.reduce((a, b) => a + b) / arr.length)

// Moving average
const movingAvg = (arr, window) => arr.map((_, i, a) => 
  a.slice(Math.max(0, i - window + 1), i + 1).reduce((sum, n) => sum + n, 0) / Math.min(i + 1, window))

// Combinations (nCr)
const combinations = (arr, k) => k === 0 ? [[]] : 
  arr.flatMap((val, i) => combinations(arr.slice(i + 1), k - 1).map(c => [val, ...c]))
```

### ⚡ Functional Programming (20+ tricks)
```javascript
// Pipe functions
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// Memoization
const memo = fn => (cache => x => cache[x] ??= fn(x))({})

// Currying
const curry = fn => (...args) => args.length >= fn.length 
  ? fn(...args) : curry(fn.bind(null, ...args))

// Compose functions (right to left)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

// Partial application
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)

// Function throttle with trailing call
const throttle = (fn, delay) => {
  let last = 0, timer = null
  return (...args) => {
    const now = Date.now()
    if (now - last >= delay) {
      fn(...args)
      last = now
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...args), delay - (now - last))
    }
  }
}

// Async pipe
const asyncPipe = (...fns) => x => fns.reduce(async (v, f) => f(await v), x)

// Rate limiter
const rateLimit = (fn, limit, interval) => {
  const calls = []
  return (...args) => {
    const now = Date.now()
    calls.push(now)
    const recentCalls = calls.filter(t => now - t < interval)
    if (recentCalls.length <= limit) return fn(...args)
    throw new Error('Rate limit exceeded')
  }
}
```

### 🔄 Async Operations (15+ tricks)
```javascript
// Sleep/delay function
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// Promise timeout
const timeout = (prom, time) => Promise.race([prom, new Promise((_, rej) => setTimeout(rej, time))])

// Async queue with concurrency limit
const queue = (concurrency = 1) => {
  let running = 0, queue = []
  return fn => new Promise((resolve, reject) => {
    queue.push({fn, resolve, reject})
    const run = async () => {
      if (running >= concurrency || !queue.length) return
      running++
      const {fn, resolve, reject} = queue.shift()
      try { resolve(await fn()) } 
      catch(e) { reject(e) }
      finally { running--; run() }
    }
    run()
  })
}

// Retry with exponential backoff and jitter
const retryWithJitter = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try { return await fn() }
    catch (e) {
      if (i === maxRetries - 1) throw e
      const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

// Parallel map with limit
const mapLimit = async (arr, limit, fn) => {
  const results = []
  const executing = []
  for (const [index, item] of arr.entries()) {
    const p = Promise.resolve().then(() => fn(item, index))
    results.push(p)
    if (arr.length >= limit) {
      executing.push(p)
      if (executing.length >= limit) {
        await Promise.race(executing)
        executing.splice(executing.findIndex(e => e === p), 1)
      }
    }
  }
  return Promise.all(results)
}

// Async event emitter
const asyncEmitter = () => {
  const events = {}
  return {
    on: (event, handler) => (events[event] ??= []).push(handler),
    emit: async (event, ...args) => {
      for (const handler of events[event] || []) {
        await handler(...args)
      }
    }
  }
}
```

### 🌐 DOM & Browser Tricks (20+ tricks)
```javascript
// Query selector shortcuts
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Copy to clipboard
navigator.clipboard.writeText(text)

// Detect mobile
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// Observe element visibility
const onVisible = (el, callback) => new IntersectionObserver(([e]) => 
  e.intersectionRatio > 0 && callback(e)).observe(el)

// Get element's offset from document
const getOffset = el => {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  }
}

// Smooth scroll to element
const scrollTo = (el, offset = 0) => window.scrollTo({
  top: el.getBoundingClientRect().top + window.scrollY - offset,
  behavior: 'smooth'
})

// Copy rich text to clipboard
const copyHTML = html => {
  const blob = new Blob([html], {type: 'text/html'})
  const item = new ClipboardItem({'text/html': blob})
  navigator.clipboard.write([item])
}

// Download data as file
const download = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], {type})
  const url = URL.createObjectURL(blob)
  Object.assign(document.createElement('a'), {href: url, download: filename}).click()
  URL.revokeObjectURL(url)
}

// Get scrollbar width
const scrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth

// Request idle callback polyfill
const idle = window.requestIdleCallback || (cb => setTimeout(() => cb({timeRemaining: () => 50}), 0))
```

### 🏆 LeetCode & Algorithm Tricks (30+ tricks)
```javascript
// Two-pointer technique
const twoSum = (arr, target) => {
  let l = 0, r = arr.length - 1
  while (l < r) arr[l] + arr[r] === target ? [l, r] : arr[l] + arr[r] < target ? l++ : r--
}

// Sliding window maximum
const maxSum = (arr, k) => Math.max(...arr.slice(0, -k + 1)
  .map((_, i) => arr.slice(i, i + k).reduce((a, b) => a + b)))

// Binary search
const binarySearch = (arr, target) => {
  let l = 0, r = arr.length - 1
  while (l <= r) {
    const m = (l + r) >> 1
    if (arr[m] === target) return m
    arr[m] < target ? l = m + 1 : r = m - 1
  }
  return -1
}

// Kadane's algorithm (max subarray sum)
const maxSubArray = arr => arr.reduce((acc, n) => [Math.max(n, acc[0] + n), Math.max(acc[1], Math.max(n, acc[0] + n))], [0, -Infinity])[1]

// Dutch flag partition (3-way)
const partition3Way = (arr, pivot) => {
  let low = 0, mid = 0, high = arr.length - 1
  while (mid <= high) {
    if (arr[mid] < pivot) [arr[low++], arr[mid++]] = [arr[mid], arr[low]]
    else if (arr[mid] > pivot) [arr[mid], arr[high--]] = [arr[high], arr[mid]]
    else mid++
  }
  return arr
}

// Reservoir sampling (random k from stream)
const reservoir = function*(k) {
  const selected = []
  let i = 0
  while (true) {
    const item = yield selected
    if (i < k) selected.push(item)
    else {
      const j = Math.floor(Math.random() * (i + 1))
      if (j < k) selected[j] = item
    }
    i++
  }
}

// Topological sort (Kahn's)
const topSort = edges => {
  const graph = {}, indegree = {}
  edges.forEach(([u, v]) => {
    (graph[u] ??= []).push(v)
    indegree[v] = (indegree[v] || 0) + 1
    indegree[u] ??= 0
  })
  const queue = Object.keys(indegree).filter(k => !indegree[k])
  const result = []
  while (queue.length) {
    const node = queue.shift()
    result.push(node)
    graph[node]?.forEach(next => --indegree[next] || queue.push(next))
  }
  return result
}

// Fibonacci with memoization
const fib = (n, memo = {}) => memo[n] ?? (n <= 1 ? n : memo[n] = fib(n - 1, memo) + fib(n - 2, memo))

// Climbing stairs (1 or 2 steps)
const climbStairs = n => [...Array(n)].reduce(([a, b]) => [b, a + b], [1, 1])[0]

// Merge overlapping intervals
const merge = intervals => intervals.sort((a, b) => a[0] - b[0]).reduce((acc, cur) => {
  const last = acc[acc.length - 1]
  return !last || last[1] < cur[0] ? [...acc, cur] : [...acc.slice(0, -1), [last[0], Math.max(last[1], cur[1])]]
}, [])
```

### 🚀 Advanced Patterns (25+ tricks)
```javascript
// Generator for infinite sequence
const fibonacci = function*() {
  let [a, b] = [0, 1]
  while (true) {
    yield a;
    [a, b] = [b, a + b]
  }
}

// Auto-save object changes
const autoSave = (obj, save) => new Proxy(obj, {
  set(target, prop, value) {
    target[prop] = value
    save(target)
    return true
  }
})

// Case-insensitive object
const caseInsensitive = obj => new Proxy(obj, {
  get: (target, prop) => target[Object.keys(target).find(k => k.toLowerCase() === prop.toLowerCase())],
  set: (target, prop, value) => {
    const key = Object.keys(target).find(k => k.toLowerCase() === prop.toLowerCase()) || prop
    target[key] = value
    return true
  }
})

// Negative array indices
const arr = new Proxy([1, 2, 3, 4, 5], {
  get(target, prop) {
    if (!isNaN(prop)) return target[prop < 0 ? target.length + Number(prop) : prop]
    return target[prop]
  }
})

// Observable object
const observable = (obj, onChange) => new Proxy(obj, {
  set(target, prop, value) {
    const old = target[prop]
    target[prop] = value
    onChange(prop, old, value)
    return true
  }
})

// Object pool pattern
const createPool = (factory, reset) => {
  const pool = []
  return {
    acquire: () => pool.pop() || factory(),
    release: obj => (reset(obj), pool.push(obj))
  }
}

// Lazy property
const lazy = (obj, prop, fn) => Object.defineProperty(obj, prop, {
  get() {
    const value = fn()
    Object.defineProperty(this, prop, {value})
    return value
  },
  configurable: true
})

// Weak memoization
const weakMemo = fn => {
  const cache = new WeakMap()
  return arg => {
    if (cache.has(arg)) return cache.get(arg)
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// Bit manipulation tricks
const bits = {
  set: (n, i) => n | (1 << i),              // Set ith bit
  clear: (n, i) => n & ~(1 << i),           // Clear ith bit
  toggle: (n, i) => n ^ (1 << i),           // Toggle ith bit
  check: (n, i) => !!(n & (1 << i)),        // Check ith bit
  rightmostSet: n => n & -n,                // Isolate rightmost set bit
  clearRightmost: n => n & (n - 1),         // Clear rightmost set bit
  isPowerOf4: n => n > 0 && !(n & (n - 1)) && !!(n & 0x55555555),
  reverseBits: n => parseInt(n.toString(2).padStart(32, '0').split('').reverse().join(''), 2)
}
```

### ⚡ Performance & Debugging (15+ tricks)
```javascript
// Measure execution time
console.time('operation'); /* code */ console.timeEnd('operation')

// Quick benchmark
const bench = fn => (start => (fn(), performance.now() - start))(performance.now())

// Debounce function
const debounce = (fn, ms) => (t => (...args) => (clearTimeout(t), t = setTimeout(() => fn(...args), ms)))()

// Throttle function
const throttle = (fn, ms) => (let t, last = 0) => (...args) => (clearTimeout(t), t = setTimeout(() => (fn(...args), last = Date.now()), Math.max(0, ms - (Date.now() - last))))()

// Memory leak prevention
const weakRef = new WeakRef(obj)
const deref = weakRef.deref() // Returns undefined if object was garbage collected

// Chunk processing for large arrays
const chunkProcess = async (arr, chunkSize, processFn) => {
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    await Promise.all(chunk.map(processFn))
    // Allow other tasks to run
    await new Promise(resolve => setTimeout(resolve, 0))
  }
}

// Virtual scrolling helper
const virtualScroll = (items, itemHeight, containerHeight) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  return (scrollTop) => {
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.min(start + visibleCount, items.length)
    return {start, end, items: items.slice(start, end), offset: start * itemHeight}
  }
}

// Lazy loading with Intersection Observer
const lazyLoad = (selector, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })
  document.querySelectorAll(selector).forEach(el => observer.observe(el))
}

// Performance monitoring
const perfMonitor = (name, fn) => {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${name} took ${end - start}ms`)
  return result
}

// Memory usage tracking
const memoryUsage = () => {
  if (performance.memory) {
    const {usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit} = performance.memory
    return {
      used: `${(usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    }
  }
  return null
}
```

## 💡 Usage Tips

1. **Browse Categories**: Click on category cards to explore different types of tricks
2. **Search**: Use the search bar to quickly find specific tricks
3. **Favorite**: Click the star (☆) button to add tricks to your favorites
4. **Copy Code**: Click the copy button to copy code snippets to clipboard
5. **Learn**: Read explanations to understand how each trick works

## 🎯 Perfect For

- **JavaScript Developers** - Expand your toolkit with powerful one-liners
- **Interview Preparation** - Master common coding patterns and techniques
- **Code Review** - Discover more elegant ways to write JavaScript
- **Learning** - Understand advanced JavaScript concepts through practical examples
- **Competitive Programming** - Fast algorithms and data structure tricks
- **Production Code** - Optimized patterns for real-world applications

## 🔥 Pro Tips & Best Practices

### When to Use These Tricks
- **Production Code**: Use well-documented, readable versions
- **Competitive Programming**: Use the most concise versions
- **Code Reviews**: Explain complex one-liners with comments
- **Learning**: Start with simple versions, then optimize

### Performance Considerations
```javascript
// ❌ Avoid in production - creates new array each time
const slow = arr.filter(x => x > 0).map(x => x * 2)

// ✅ Better - single pass
const fast = arr.reduce((acc, x) => x > 0 ? [...acc, x * 2] : acc, [])

// ✅ Best - for large arrays, use for...of
const fastest = []
for (const x of arr) if (x > 0) fastest.push(x * 2)
```

### Memory Management
```javascript
// Use WeakMap/WeakSet for object keys to allow garbage collection
const cache = new WeakMap()
const memoized = obj => cache.has(obj) ? cache.get(obj) : cache.set(obj, expensive(obj))

// Clear references when done
const cleanup = () => {
  cache.clear()
  // Clear other references
}
```

### Error Handling
```javascript
// Safe property access with fallbacks
const safeGet = (obj, path, fallback) => {
  try {
    return path.split('.').reduce((o, p) => o?.[p], obj) ?? fallback
  } catch {
    return fallback
  }
}

// Async error boundaries
const withErrorBoundary = async (fn, fallback) => {
  try {
    return await fn()
  } catch (error) {
    console.error('Operation failed:', error)
    return fallback
  }
}
```

## 🚀 Advanced Use Cases

### Time & Date Formatting
```javascript
// Digital clock with padStart
const time = new Date()
const clock = [time.getHours(), time.getMinutes(), time.getSeconds()]
  .map(n => String(n).padStart(2, '0'))
  .join(':')  // "09:05:03"

// 12-hour format with AM/PM
const hour12 = h => `${h % 12 || 12}`.padStart(2, '0') + (h < 12 ? ' AM' : ' PM')

// Countdown timer format
const formatTime = seconds => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':')
}

// Relative time (e.g., "2 hours ago")
const timeAgo = date => {
  const seconds = Math.floor((Date.now() - date) / 1000)
  const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 }
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / seconds)
    if (interval >= 1) return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
```

### Data Validation & Sanitization
```javascript
// Email validation one-liner
const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Strip HTML tags
const stripHTML = html => html.replace(/<[^>]*>/g, '')

// Extract numbers from string
const extractNumbers = str => str.match(/\d+/g)?.map(Number) || []

// Validate password strength
const strongPassword = pwd => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd)

// Schema validator
const validate = (obj, schema) => Object.entries(schema).every(([key, type]) => 
  typeof obj[key] === type || (type === 'array' && Array.isArray(obj[key])))
```

### Color & Visual Formatting
```javascript
// Generate random hex color
const randomColor = () => '#' + Math.random().toString(16).slice(-6)

// Lighten/darken hex color
const adjustColor = (color, amount) => '#' + color.replace(/^#/, '').match(/../g)
  .map(c => Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16).padStart(2, '0'))
  .join('')

// HSL to RGB conversion
const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0), f(8), f(4)].map(x => Math.round(x * 255))
}

// RGB to Hex color
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
```

### Data Processing & Analysis
```javascript
// Group and count occurrences
const countBy = (arr, fn) => arr.reduce((acc, val) => {
  const key = fn(val)
  acc[key] = (acc[key] || 0) + 1
  return acc
}, {})

// Parse query string
const parseQuery = url => Object.fromEntries(new URLSearchParams(url.split('?')[1]))

// Build query string
const buildQuery = obj => '?' + Object.entries(obj).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')

// Calculate age from birthdate
const age = birthDate => ~~((Date.now() - new Date(birthDate)) / 31557600000)

// Percentile calculation
const percentile = (arr, p) => {
  const sorted = [...arr].sort((a, b) => a - b)
  const index = (sorted.length - 1) * p / 100
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  return lower === upper ? sorted[index] : sorted[lower] * (upper - index) + sorted[upper] * (index - lower)
}
```

## 🎯 Perfect For

- **JavaScript Developers** - Expand your toolkit with powerful one-liners
- **Interview Preparation** - Master common coding patterns and techniques
- **Code Review** - Discover more elegant ways to write JavaScript
- **Learning** - Understand advanced JavaScript concepts through practical examples

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Add new JavaScript tricks and patterns
2. Improve existing examples
3. Enhance the UI/UX
4. Fix bugs or add features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the JavaScript community's love for elegant one-liners
- Built with modern React patterns and best practices
- Designed for optimal learning and developer experience

---

**Happy coding! 🎉**