import React from 'react';
import CodeBlock from './CodeBlock';

const TimeTricks: React.FC = () => {
  return (
    <div className="tricks-container">
      <h2>⏰ Time & Date Formatting Tricks</h2>
      <p className="section-description">
        Master time and date manipulation with practical formatting tricks for real-world applications.
      </p>
      
      <div className="examples-grid">
        {/* Digital Clock Formatting */}
        <div className="example-card">
          <CodeBlock 
            title="Digital Clock with padStart"
            description="Always show 2 digits for hours, minutes, seconds"
            code={`const formatDigitalClock = () => {
  const time = new Date();
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  return \`\${hours}:\${minutes}:\${seconds}\`;
};

// Usage
formatDigitalClock();`}
            result="09:05:03"
            explanation="padStart ensures consistent 2-digit formatting for all time components."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="12-Hour Format with AM/PM"
            description="Convert 24-hour to 12-hour format"
            code={`const format12Hour = (hour) => {
  const hour12 = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return \`\${String(hour12).padStart(2, '0')} \${ampm}\`;
};

// Examples
format12Hour(15); // "03 PM"
format12Hour(0);  // "12 AM"
format12Hour(9);  // "09 AM"`}
            result="03 PM"
            explanation="Converts 24-hour format to 12-hour with proper AM/PM designation."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Countdown Timer Format"
            description="Format seconds into HH:MM:SS"
            code={`const formatCountdown = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return [hours, minutes, secs]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
};

// Examples
formatCountdown(3661); // "01:01:01"
formatCountdown(125);  // "00:02:05"`}
            result="01:01:01"
            explanation="Converts total seconds into readable time format with leading zeros."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Relative Time (Time Ago)"
            description="Show relative time like '2 hours ago'"
            code={`const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return \`\${interval} \${unit}\${interval > 1 ? 's' : ''} ago\`;
    }
  }
  
  return 'just now';
};

// Usage
timeAgo(new Date(Date.now() - 7200000)); // "2 hours ago"`}
            result="2 hours ago"
            explanation="Calculates relative time by comparing current time with past date."
          />
        </div>

        {/* Number Formatting */}
        <div className="example-card">
          <CodeBlock 
            title="Currency Formatting"
            description="Format numbers as currency"
            code={`const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Quick dollar format
const formatDollar = (amount) => {
  return '$' + amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
};

// Examples
formatCurrency(1234.56);     // "$1,234.56"
formatDollar(1234.56);       // "$1,234.56"`}
            result="$1,234.56"
            explanation="Uses Intl.NumberFormat for locale-aware currency formatting."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Add Thousand Separators"
            description="Format numbers with comma separators"
            code={`const addCommas = (num) => {
  return num.toLocaleString();
};

// Alternative with regex
const addCommasRegex = (num) => {
  return String(num).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
};

// Examples
addCommas(1234567);      // "1,234,567"
addCommasRegex(1234567); // "1,234,567"`}
            result="1,234,567"
            explanation="Adds thousand separators for better readability of large numbers."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="File Size Formatting"
            description="Convert bytes to human-readable file sizes"
            code={`const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return \`\${(bytes / Math.pow(1024, i)).toFixed(2)} \${sizes[i]}\`;
};

// Examples
formatFileSize(1234567);  // "1.18 MB"
formatFileSize(1024);     // "1.00 KB"
formatFileSize(1073741824); // "1.00 GB"`}
            result="1.18 MB"
            explanation="Converts bytes to appropriate unit (B, KB, MB, GB, TB) with 2 decimal places."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Percentage Formatting"
            description="Calculate and format percentages"
            code={`const formatPercentage = (part, total, decimals = 1) => {
  return \`\${((part / total) * 100).toFixed(decimals)}%\`;
};

// Examples
formatPercentage(33, 100);    // "33.0%"
formatPercentage(7, 20);      // "35.0%"
formatPercentage(1, 3, 2);    // "33.33%"`}
            result="33.0%"
            explanation="Calculates percentage and formats with specified decimal places."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Ordinal Numbers"
            description="Add ordinal suffixes (1st, 2nd, 3rd, etc.)"
            code={`const ordinal = (n) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

// Examples
ordinal(1);   // "1st"
ordinal(2);   // "2nd"
ordinal(3);   // "3rd"
ordinal(4);   // "4th"
ordinal(21);  // "21st"
ordinal(22);  // "22nd"`}
            result="1st"
            explanation="Adds appropriate ordinal suffix based on number ending."
          />
        </div>

        {/* String Formatting */}
        <div className="example-card">
          <CodeBlock 
            title="Phone Number Formatting"
            description="Format phone numbers with parentheses and dashes"
            code={`const formatPhone = (str) => {
  return str.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');
};

// Examples
formatPhone('5551234567'); // "(555) 123-4567"
formatPhone('1234567890'); // "(123) 456-7890"`}
            result="(555) 123-4567"
            explanation="Uses regex to format 10-digit phone numbers with standard formatting."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Credit Card Masking"
            description="Mask credit card numbers for security"
            code={`const maskCard = (card) => {
  return card.slice(-4).padStart(card.length, '*');
};

// With spaces
const formatCard = (s) => {
  return s.match(/.{1,4}/g).join(' ');
};

// Examples
maskCard('1234567812345678');     // "************5678"
formatCard('1234567812345678');   // "1234 5678 1234 5678"`}
            result="************5678"
            explanation="Masks all digits except last 4 for security display."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="URL Slug Generation"
            description="Convert string to URL-friendly slug"
            code={`const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/[\\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Examples
slugify('Hello World!');           // "hello-world"
slugify('JavaScript & React');     // "javascript-react"
slugify('  Multiple   Spaces  ');  // "multiple-spaces"`}
            result="hello-world"
            explanation="Converts any string to URL-friendly format by removing special characters and replacing spaces with hyphens."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Truncate Middle of String"
            description="Truncate long filenames in the middle"
            code={`const truncateMiddle = (str, maxLen) => {
  if (str.length <= maxLen) return str;
  
  const half = Math.floor(maxLen / 2);
  const start = str.slice(0, half - 2);
  const end = str.slice(-(half - 1));
  
  return \`\${start}...\${end}\`;
};

// Examples
truncateMiddle('verylongfilename.pdf', 15); // "verylo...me.pdf"
truncateMiddle('short.txt', 10);            // "short.txt"`}
            result="verylo...me.pdf"
            explanation="Truncates long strings in the middle while preserving start and end portions."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Zero-Width Space for Word Breaking"
            description="Insert invisible break points for long words"
            code={`const breakLongWords = (str, maxLength = 20) => {
  const regex = new RegExp(\`(\\w{\${maxLength}})\`, 'g');
  return str.replace(regex, '$1\\u200B');
};

// Usage
const longText = 'This is a very long word that needs breaking: supercalifragilisticexpialidocious';
breakLongWords(longText, 10);`}
            result="Breaks long words with invisible characters"
            explanation="Inserts zero-width space characters to allow word breaking at specific lengths."
          />
        </div>

        {/* Input Validation & Sanitization */}
        <div className="example-card">
          <CodeBlock 
            title="Email Validation"
            description="Validate email format"
            code={`const isValidEmail = (email) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

// Examples
isValidEmail('user@example.com');  // true
isValidEmail('invalid-email');     // false
isValidEmail('user@.com');         // false`}
            result="true"
            explanation="Uses regex to validate basic email format requirements."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Strip HTML Tags"
            description="Remove HTML tags from string"
            code={`const stripHTML = (html) => {
  return html.replace(/<[^>]*>/g, '');
};

// Example
const htmlText = '<p>Hello <b>World</b>!</p>';
stripHTML(htmlText); // "Hello World!"`}
            result="Hello World!"
            explanation="Removes all HTML tags while preserving text content."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Extract Numbers from String"
            description="Extract all numbers from text"
            code={`const extractNumbers = (str) => {
  const matches = str.match(/\\d+/g);
  return matches ? matches.map(Number) : [];
};

// Examples
extractNumbers('I have 2 cats and 3 dogs');     // [2, 3]
extractNumbers('Price: $19.99, Quantity: 5');   // [19, 99, 5]
extractNumbers('No numbers here');              // []`}
            result="[2, 3]"
            explanation="Finds all numeric sequences in string and converts them to numbers."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Password Strength Validation"
            description="Check password strength requirements"
            code={`const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  };
  
  const passed = Object.values(requirements).filter(Boolean).length;
  const strength = passed < 3 ? 'weak' : passed < 5 ? 'medium' : 'strong';
  
  return { requirements, strength, passed };
};

// Example
validatePassword('MyP@ssw0rd');`}
            result="{requirements: {...}, strength: 'strong', passed: 5}"
            explanation="Validates password against multiple security requirements and provides strength rating."
          />
        </div>

        {/* Color & Visual Formatting */}
        <div className="example-card">
          <CodeBlock 
            title="Generate Random Hex Color"
            description="Generate random hex color codes"
            code={`const randomColor = () => {
  return '#' + Math.random().toString(16).slice(-6);
};

// Alternative with more control
const randomColorRange = (min = 0, max = 255) => {
  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);
  return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;
};

// Examples
randomColor();           // "#a1b2c3"
randomColorRange(100, 200); // Darker colors`}
            result="#a1b2c3"
            explanation="Generates random hex color codes for UI elements."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Lighten/Darken Hex Color"
            description="Adjust color brightness"
            code={`const adjustColor = (color, amount) => {
  return '#' + color.replace(/^#/, '').match(/../g)
    .map(c => {
      const num = parseInt(c, 16);
      const adjusted = Math.min(255, Math.max(0, num + amount));
      return adjusted.toString(16).padStart(2, '0');
    })
    .join('');
};

// Examples
adjustColor('#3366cc', 40);   // Lighter blue
adjustColor('#3366cc', -40);  // Darker blue`}
            result="Lighter or darker version of input color"
            explanation="Adjusts RGB values by specified amount while keeping values in valid range."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="HSL to RGB Conversion"
            description="Convert HSL color to RGB"
            code={`const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255)
  ];
};

// Example
hslToRgb(240, 100, 50); // [0, 0, 255] (blue)`}
            result="[0, 0, 255]"
            explanation="Converts HSL color values to RGB using mathematical color space conversion."
          />
        </div>

        {/* Data Processing */}
        <div className="example-card">
          <CodeBlock 
            title="Group and Count Occurrences"
            description="Group array items and count their occurrences"
            code={`const countBy = (arr, fn) => {
  return arr.reduce((acc, val) => {
    const key = fn(val);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

// Examples
const words = ['apple', 'banana', 'apple', 'cherry', 'banana'];
countBy(words, word => word.length); // {5: 2, 6: 2, 7: 1}

const numbers = [1, 2, 3, 4, 5, 6];
countBy(numbers, n => n % 2 === 0 ? 'even' : 'odd'); // {odd: 3, even: 3}`}
            result="{5: 2, 6: 2, 7: 1}"
            explanation="Groups items by a function and counts occurrences in each group."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Parse Query String"
            description="Convert URL query string to object"
            code={`const parseQuery = (url) => {
  const queryString = url.split('?')[1];
  if (!queryString) return {};
  
  return Object.fromEntries(new URLSearchParams(queryString));
};

// Example
const url = 'https://example.com?name=john&age=30&city=nyc';
parseQuery(url); // {name: 'john', age: '30', city: 'nyc'}`}
            result="{name: 'john', age: '30', city: 'nyc'}"
            explanation="Parses URL query parameters into a JavaScript object."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Build Query String"
            description="Convert object to URL query string"
            code={`const buildQuery = (obj) => {
  const params = Object.entries(obj)
    .map(([key, value]) => \`\${key}=\${encodeURIComponent(value)}\`)
    .join('&');
  
  return params ? \`?\${params}\` : '';
};

// Example
const params = { name: 'john', age: 30, city: 'new york' };
buildQuery(params); // "?name=john&age=30&city=new%20york"`}
            result="?name=john&age=30&city=new%20york"
            explanation="Converts object to URL query string with proper encoding."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Deep Get Nested Property"
            description="Safely access nested object properties"
            code={`const deepGet = (obj, path, defaultValue) => {
  return path.split('.').reduce((o, p) => o?.[p], obj) ?? defaultValue;
};

// Examples
const user = {
  profile: {
    address: {
      city: 'New York'
    }
  }
};

deepGet(user, 'profile.address.city', 'Unknown');     // 'New York'
deepGet(user, 'profile.address.country', 'Unknown');  // 'Unknown'
deepGet(user, 'nonexistent.path', 'Default');         // 'Default'`}
            result="New York"
            explanation="Safely traverses nested object properties with optional chaining and default values."
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Calculate Age from Birthdate"
            description="Calculate age from birth date"
            code={`const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Example
calculateAge('1990-05-15'); // Age in 2024`}
            result="34"
            explanation="Calculates accurate age considering month and day differences."
          />
        </div>
      </div>
    </div>
  );
};

export default TimeTricks;
