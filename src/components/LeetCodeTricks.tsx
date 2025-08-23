import React from 'react';
import CodeBlock from './CodeBlock';

const LeetCodeTricks: React.FC = () => {
  const leetCodeExamples = [
    {
      title: "Two Pointers Technique",
      description: "Efficient array traversal with two pointers",
      code: `// Find pair that sums to target in sorted array
const twoSum = (arr, target) => {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
};
const result = twoSum([1, 2, 3, 4, 6], 6);`,
      result: (() => {
        const twoSum = (arr: number[], target: number) => {
          let left = 0, right = arr.length - 1;
          while (left < right) {
            const sum = arr[left] + arr[right];
            if (sum === target) return [left, right];
            if (sum < target) left++;
            else right--;
          }
          return [-1, -1];
        };
        return twoSum([1, 2, 3, 4, 6], 6);
      })(),
      explanation: "Uses two pointers moving from opposite ends, O(n) time complexity"
    },
    {
      title: "Sliding Window",
      description: "Maintain a dynamic range of elements",
      code: `// Find maximum sum of k consecutive elements
const maxSumSubarray = (arr, k) => {
  let maxSum = 0, currentSum = 0;
  for (let i = 0; i < k; i++) currentSum += arr[i];
  maxSum = currentSum;
  
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
};
const result = maxSumSubarray([1, 4, 2, 10, 2, 3, 1, 0, 20], 4);`,
      result: (() => {
        const maxSumSubarray = (arr: number[], k: number) => {
          let maxSum = 0, currentSum = 0;
          for (let i = 0; i < k; i++) currentSum += arr[i];
          maxSum = currentSum;
          
          for (let i = k; i < arr.length; i++) {
            currentSum = currentSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, currentSum);
          }
          return maxSum;
        };
        return maxSumSubarray([1, 4, 2, 10, 2, 3, 1, 0, 20], 4);
      })(),
      explanation: "Maintains a window of k elements, slides it to find maximum sum"
    },
    {
      title: "Binary Search",
      description: "Efficient search in sorted arrays",
      code: `// Find first occurrence of target
const binarySearch = (arr, target) => {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};
const result = binarySearch([1, 3, 5, 7, 9, 11], 7);`,
      result: (() => {
        const binarySearch = (arr: number[], target: number) => {
          let left = 0, right = arr.length - 1;
          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
          }
          return -1;
        };
        return binarySearch([1, 3, 5, 7, 9, 11], 7);
      })(),
      explanation: "Divides search space in half each iteration, O(log n) time complexity"
    },
    {
      title: "Depth First Search (DFS)",
      description: "Traverse tree/graph using recursion",
      code: `// DFS on binary tree
const dfs = (node, result = []) => {
  if (!node) return result;
  result.push(node.val); // Pre-order
  dfs(node.left, result);
  dfs(node.right, result);
  return result;
};

// Example tree: [1, 2, 3, 4, 5]
const tree = {
  val: 1,
  left: { val: 2, left: { val: 4 }, right: { val: 5 } },
  right: { val: 3 }
};
const result = dfs(tree);`,
      result: (() => {
        const dfs = (node: any, result: any[] = []) => {
          if (!node) return result;
          result.push(node.val);
          dfs(node.left, result);
          dfs(node.right, result);
          return result;
        };
        const tree = {
          val: 1,
          left: { val: 2, left: { val: 4 }, right: { val: 5 } },
          right: { val: 3 }
        };
        return dfs(tree);
      })(),
      explanation: "Uses recursion to explore as far as possible along each branch"
    },
    {
      title: "Breadth First Search (BFS)",
      description: "Level-by-level traversal using queue",
      code: `// BFS on binary tree
const bfs = (root) => {
  if (!root) return [];
  const queue = [root];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
};

const tree = {
  val: 1,
  left: { val: 2, left: { val: 4 }, right: { val: 5 } },
  right: { val: 3 }
};
const result = bfs(tree);`,
      result: (() => {
        const bfs = (root: any) => {
          if (!root) return [];
          const queue = [root];
          const result = [];
          
          while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
          }
          return result;
        };
        const tree = {
          val: 1,
          left: { val: 2, left: { val: 4 }, right: { val: 5 } },
          right: { val: 3 }
        };
        return bfs(tree);
      })(),
      explanation: "Uses queue to process all nodes at current level before moving to next"
    },
    {
      title: "Dynamic Programming - Memoization",
      description: "Cache subproblem results",
      code: `// Fibonacci with memoization
const fibMemo = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
};
const result = fibMemo(10);`,
      result: (() => {
        const fibMemo = (n: number, memo: any = {}) => {
          if (n in memo) return memo[n];
          if (n <= 1) return n;
          
          memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
          return memo[n];
        };
        return fibMemo(10);
      })(),
      explanation: "Stores previously calculated values to avoid redundant computations"
    },
    {
      title: "Dynamic Programming - Tabulation",
      description: "Build solution bottom-up",
      code: `// Fibonacci with tabulation
const fibTab = (n) => {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
const result = fibTab(10);`,
      result: (() => {
        const fibTab = (n: number) => {
          const dp = new Array(n + 1).fill(0);
          dp[1] = 1;
          
          for (let i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
          }
          return dp[n];
        };
        return fibTab(10);
      })(),
      explanation: "Builds solution iteratively from base cases to target"
    },
    {
      title: "Hash Map Optimization",
      description: "Use hash maps for O(1) lookups",
      code: `// Two Sum with hash map
const twoSumHash = (nums, target) => {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      const value = map.get(complement);
      if (value !== undefined) {
        return [value, i];
      }
    }
    map.set(nums[i], i);
  }
  return [-1, -1];
};
const result = twoSumHash([2, 7, 11, 15], 9);`,
      result: (() => {
        const twoSumHash = (nums: number[], target: number) => {
          const map = new Map();
          
          for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) {
              return [map.get(complement), i];
            }
            map.set(nums[i], i);
          }
          return [-1, -1];
        };
        return twoSumHash([2, 7, 11, 15], 9);
      })(),
      explanation: "Trades space for time, O(n) time complexity instead of O(n²)"
    },
    {
      title: "Stack for Parentheses",
      description: "Validate balanced parentheses",
      code: `// Valid parentheses
const isValid = (s) => {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  
  for (const char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      if (stack.length === 0 || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
const result = isValid('({[]})');`,
      result: (() => {
        const isValid = (s: string) => {
          const stack: string[] = [];
          const pairs: Record<string, string> = { '(': ')', '{': '}', '[': ']' };
          
          for (const char of s) {
            if (pairs[char]) {
              stack.push(char);
            } else {
              const popped = stack.pop();
            if (stack.length === 0 || !popped || pairs[popped] !== char) {
                return false;
              }
            }
          }
          return stack.length === 0;
        };
        return isValid('({[]})');
      })(),
      explanation: "Uses stack to track opening brackets and match with closing ones"
    },
    {
      title: "Monotonic Stack",
      description: "Maintain stack with monotonic property",
      code: `// Next greater element
const nextGreater = (arr) => {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      result[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return result;
};
const result = nextGreater([4, 5, 2, 10]);`,
      result: (() => {
        const nextGreater = (arr: number[]) => {
          const result = new Array(arr.length).fill(-1);
          const stack: number[] = [];
          
          for (let i = 0; i < arr.length; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
              const popped = stack.pop();
              if (popped !== undefined) {
                result[popped] = arr[i];
              }
            }
            stack.push(i);
          }
          return result;
        };
        return nextGreater([4, 5, 2, 10]);
      })(),
      explanation: "Maintains decreasing order in stack, finds next greater element for each"
    },
    {
      title: "Union Find",
      description: "Efficiently manage connected components",
      code: `// Union Find with path compression
class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return;
    
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      if (this.rank[rootX] === this.rank[rootY]) {
        this.rank[rootX]++;
      }
    }
  }
}`,
      result: "Class defined",
      explanation: "Efficiently manages connected components with path compression and union by rank"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>🏆 LeetCode Style</h2>
      <p className="section-description">
        Master competitive programming and algorithm techniques with these LeetCode-style tricks.
      </p>

      <div className="examples-grid">
        {leetCodeExamples.map((example, index) => (
          <div key={index} className="example-card">
            <CodeBlock {...example} category="leetcode" />
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3>💡 Algorithm Tips</h3>
        <ul>
          <li><strong>Two Pointers:</strong> Perfect for sorted arrays and palindrome problems</li>
          <li><strong>Sliding Window:</strong> Great for subarray/substring problems</li>
          <li><strong>Binary Search:</strong> Always works on sorted data, O(log n) time</li>
          <li><strong>DFS vs BFS:</strong> DFS for deep exploration, BFS for level-order</li>
          <li><strong>Dynamic Programming:</strong> Memoization (top-down) vs Tabulation (bottom-up)</li>
          <li><strong>Hash Maps:</strong> Trade space for time, O(1) lookups</li>
          <li><strong>Stacks:</strong> Perfect for parentheses, monotonic properties</li>
          <li><strong>Union Find:</strong> Efficient for connected components problems</li>
        </ul>
      </div>
    </div>
  );
};

export default LeetCodeTricks;
