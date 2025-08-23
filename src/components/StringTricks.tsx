import React from 'react';
import CodeBlock from './CodeBlock';

const StringTricks: React.FC = () => {
  const stringExamples = [
    {
      title: "Reverse String",
      description: "Reverse a string using array methods",
      code: "const reversed = 'hello'.split('').reverse().join('')",
      result: 'hello'.split('').reverse().join(''),
      explanation: "split('') converts to array, reverse() reverses, join('') converts back to string"
    },
    {
      title: "Reverse String (Spread)",
      description: "Reverse using spread operator",
      code: "const reversed = [...'hello'].reverse().join('')",
      result: [...'hello'].reverse().join(''),
      explanation: "Spread operator (...) spreads string into array of characters"
    },
    {
      title: "Capitalize First Letter",
      description: "Capitalize the first character",
      code: "const capitalized = str.charAt(0).toUpperCase() + str.slice(1)",
      result: (() => {
        const str = 'hello world';
        return str.charAt(0).toUpperCase() + str.slice(1);
      })(),
      explanation: "charAt(0) gets first char, toUpperCase() capitalizes, slice(1) gets rest of string"
    },
    {
      title: "Title Case",
      description: "Capitalize first letter of each word",
      code: `const titleCase = str => str.replace(/\\b\\w/g, l => l.toUpperCase());
const result = titleCase('hello world example')`,
      result: (() => {
        const titleCase = (str: string) => str.replace(/\b\w/g, l => l.toUpperCase());
        return titleCase('hello world example');
      })(),
      explanation: "Regex \\b\\w matches word boundaries and first letter, replace() capitalizes each"
    },
    {
      title: "Check Palindrome",
      description: "Check if string reads the same forwards and backwards",
      code: `const isPalindrome = str => str === str.split('').reverse().join('');
const result = isPalindrome('racecar')`,
      result: (() => {
        const isPalindrome = (str: string) => str === str.split('').reverse().join('');
        return isPalindrome('racecar');
      })(),
      explanation: "Compare original string with its reverse"
    },
    {
      title: "Repeat String",
      description: "Repeat string n times",
      code: "const repeated = 'ab'.repeat(3)",
      result: 'ab'.repeat(3),
      explanation: "repeat() method repeats string specified number of times"
    },
    {
      title: "Truncate with Ellipsis",
      description: "Truncate long string with ...",
      code: `const truncate = (str, maxLen) => str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
const result = truncate('This is a very long string', 15)`,
      result: (() => {
        const truncate = (str: string, maxLen: number) => str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
        return truncate('This is a very long string', 15);
      })(),
      explanation: "Ternary operator checks length, slice() cuts string, concatenates '...'"
    },
    {
      title: "Count Characters",
      description: "Count occurrences of each character",
      code: `const charCount = str => [...str].reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
const result = charCount('hello')`,
      result: (() => {
        const charCount = (str: string) => [...str].reduce((acc: any, char) => {
          acc[char] = (acc[char] || 0) + 1;
          return acc;
        }, {});
        return charCount('hello');
      })(),
      explanation: "Spread string to array, reduce() builds frequency object"
    },
    {
      title: "Remove Duplicate Characters",
      description: "Remove duplicate characters from string",
      code: "const unique = [...new Set('hello')].join('')",
      result: Array.from(new Set('hello')).join(''),
      explanation: "Set removes duplicates, spread converts to array, join() back to string"
    },
    {
      title: "Check Anagram",
      description: "Check if two strings are anagrams",
      code: `const isAnagram = (s1, s2) => s1.split('').sort().join('') === s2.split('').sort().join('');
const result = isAnagram('listen', 'silent')`,
      result: (() => {
        const isAnagram = (s1: string, s2: string) => s1.split('').sort().join('') === s2.split('').sort().join('');
        return isAnagram('listen', 'silent');
      })(),
      explanation: "Sort both strings and compare - anagrams have same sorted characters"
    },
    {
      title: "Extract Numbers",
      description: "Extract all numbers from string",
      code: "const numbers = 'I have 2 cats and 3 dogs'.match(/\\d+/g).map(Number)",
      result: (() => {
        const str = 'I have 2 cats and 3 dogs';
        return str.match(/\d+/g)?.map(Number) || [];
      })(),
      explanation: "Regex \\d+ matches one or more digits, map(Number) converts to numbers"
    },
    {
      title: "Generate Slug",
      description: "Convert string to URL-friendly slug",
      code: `const slugify = str => str
  .toLowerCase()
  .trim()
  .replace(/[^\\w\\s-]/g, '')
  .replace(/[\\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');
const result = slugify('Hello World!')`,
      result: (() => {
        const slugify = (str: string) => str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return slugify('Hello World!');
      })(),
      explanation: "Chain of replace() operations: lowercase, remove special chars, replace spaces with hyphens, trim hyphens"
    },
    {
      title: "Mask String",
      description: "Mask all characters except last n",
      code: `const mask = (str, n = 4) => '*'.repeat(str.length - n) + str.slice(-n);
const result = mask('1234567890')`,
      result: (() => {
        const mask = (str: string, n = 4) => '*'.repeat(str.length - n) + str.slice(-n);
        return mask('1234567890');
      })(),
      explanation: "repeat() creates asterisks for masked part, slice(-n) gets last n characters"
    },
    {
      title: "Format Phone Number",
      description: "Format string as phone number",
      code: `const formatPhone = s => s.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');
const result = formatPhone('5551234567')`,
      result: (() => {
        const formatPhone = (s: string) => s.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        return formatPhone('5551234567');
      })(),
      explanation: "Regex captures 3 groups of digits, replace() formats with parentheses and hyphens"
    },
    {
      title: "Check if String Contains Only Letters",
      description: "Validate string contains only alphabetic characters",
      code: "const onlyLetters = /^[a-zA-Z]+$/.test('HelloWorld')",
      result: /^[a-zA-Z]+$/.test('HelloWorld'),
      explanation: "Regex ^[a-zA-Z]+$ matches string that starts and ends with only letters"
    },
    {
      title: "Convert to Camel Case",
      description: "Convert kebab-case or snake_case to camelCase",
      code: `const toCamelCase = str => str.replace(/[-_](\\w)/g, (_, c) => c.toUpperCase());
const result = toCamelCase('hello-world_example')`,
      result: (() => {
        const toCamelCase = (str: string) => str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
        return toCamelCase('hello-world_example');
      })(),
      explanation: "Regex matches hyphen/underscore followed by word character, replace() capitalizes the word character"
    },
    {
      title: "Pad String",
      description: "Pad string to specified length",
      code: `const pad = (str, length, char = ' ') => str.padStart(length, char);
const result = pad('42', 5, '0')`,
      result: (() => {
        const pad = (str: string, length: number, char = ' ') => str.padStart(length, char);
        return pad('42', 5, '0');
      })(),
      explanation: "padStart() adds characters to beginning until string reaches specified length"
    },
    {
      title: "Word Count",
      description: "Count words in string",
      code: `const wordCount = str => str.trim().split(/\\s+/).length;
const result = wordCount('  hello   world  example  ')`,
      result: (() => {
        const wordCount = (str: string) => str.trim().split(/\s+/).length;
        return wordCount('  hello   world  example  ');
      })(),
      explanation: "trim() removes leading/trailing spaces, split(/\\s+/) splits on one or more whitespace characters"
    }
  ];

  return (
    <div className="tricks-container">
      <h2>📝 String Processing Tricks</h2>
      <p className="section-description">
        Master string manipulation with these powerful techniques and one-liners.
      </p>

      <div className="examples-grid">
        {stringExamples.map((example, index) => (
          <div key={index} className="example-card">
            <CodeBlock {...example} />
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li><strong>Performance:</strong> Use string methods over regex when possible for better performance</li>
          <li><strong>Unicode:</strong> Be careful with Unicode characters - use spread operator for proper character iteration</li>
          <li><strong>Regex:</strong> Use regex flags like 'g' for global matching, 'i' for case-insensitive</li>
          <li><strong>Immutability:</strong> String methods return new strings - original string is never modified</li>
        </ul>
      </div>
    </div>
  );
};

export default StringTricks;
