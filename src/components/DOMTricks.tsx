import React from 'react';
import CodeBlock from './CodeBlock';

const DOMTricks: React.FC = () => {
  return (
    <div className="tricks-container">
      <h2>🌐 DOM Manipulation</h2>
      <p className="section-description">
        Browser DOM tricks, utilities, and modern web API techniques for efficient DOM manipulation.
      </p>
      
      <div className="examples-grid">
        <div className="example-card">
          <CodeBlock 
            title="Query Selector with Fallback"
            code="const $ = (selector, parent = document) => {
  const element = parent.querySelector(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
};

const $all = (selector, parent = document) => 
  Array.from(parent.querySelectorAll(selector));"
            result="Safe query selector with error handling"
            explanation="Wrapper for querySelector that throws descriptive errors when elements aren't found"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Create Element Helper"
            code="const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
};"
            result="Element creation helper function"
            explanation="Creates DOM elements with attributes and children in a single function call"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Event Delegation"
            code="const delegate = (event, selector, handler) => {
  document.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && e.currentTarget.contains(target)) {
      handler.call(target, e, target);
    }
  });
};

delegate('click', '.btn', (e, target) => {
  console.log('Button clicked:', target.textContent);
});"
            result="Event delegation for dynamic elements"
            explanation="Handles events for elements that may not exist when the listener is attached"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Intersection Observer"
            code="const observeElement = (element, callback, options = {}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
  
  observer.observe(element);
  return observer;
};

observeElement(
  document.querySelector('.lazy-image'),
  (entry) => {
    entry.target.src = entry.target.dataset.src;
  },
  { threshold: 0.1 }
);"
            result="Intersection observer for lazy loading"
            explanation="Detects when elements enter the viewport for lazy loading and animations"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Mutation Observer"
            code="const watchDOM = (target, callback, options = {}) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        callback(mutation.addedNodes, mutation.removedNodes);
      }
    });
  });
  
  observer.observe(target, {
    childList: true,
    subtree: true,
    ...options
  });
  
  return observer;
};"
            result="DOM change detection"
            explanation="Monitors DOM changes and triggers callbacks when elements are added or removed"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Resize Observer"
            code="const watchResize = (element, callback) => {
  const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
      const { width, height } = entry.contentRect;
      callback({ width, height, element: entry.target });
    });
  });
  
  observer.observe(element);
  return observer;
};

watchResize(document.querySelector('.responsive'), ({ width, height }) => {
  console.log(`Element resized to ${width}x${height}`);
});"
            result="Element resize detection"
            explanation="Monitors element size changes for responsive design and layout adjustments"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Smooth Scroll"
            code="const smoothScrollTo = (element, options = {}) => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};"
            result="Smooth scrolling utilities"
            explanation="Provides smooth scrolling to elements and to the top of the page"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Copy to Clipboard"
            code="const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

copyToClipboard('Hello, World!');"
            result="Cross-browser clipboard copy"
            explanation="Copies text to clipboard with fallback for older browsers"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Element Position"
            code="const getElementPosition = (element) => {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
    right: rect.right + window.pageXOffset,
    width: rect.width,
    height: rect.height
  };
};

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};"
            result="Element position and visibility utilities"
            explanation="Gets element position relative to document and checks if element is in viewport"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="CSS Variables Manipulation"
            code="const setCSSVariable = (name, value, element = document.documentElement) => {
  element.style.setProperty(`--${name}`, value);
};

const getCSSVariable = (name, element = document.documentElement) => {
  return getComputedStyle(element).getPropertyValue(`--${name}`).trim();
};

const updateTheme = (theme) => {
  setCSSVariable('primary-color', theme.primary);
  setCSSVariable('secondary-color', theme.secondary);
  setCSSVariable('background-color', theme.background);
};"
            result="CSS custom properties manipulation"
            explanation="Manipulates CSS custom properties (variables) dynamically"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Element Animation"
            code="const animateElement = (element, keyframes, options = {}) => {
  return element.animate(keyframes, {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards',
    ...options
  });
};

const fadeIn = (element) => {
  return animateElement(element, [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ]);
};

const slideIn = (element) => {
  return animateElement(element, [
    { transform: 'translateX(-100%)' },
    { transform: 'translateX(0)' }
  ], { duration: 500 });
};"
            result="Element animation utilities"
            explanation="Creates smooth animations using the Web Animations API"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Form Data Helper"
            code="const getFormData = (form) => {
  const formData = new FormData(form);
  const data = {};
  
  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }
  
  return data;
};

const setFormData = (form, data) => {
  Object.entries(data).forEach(([key, value]) => {
    const input = form.querySelector('[name=' + key + ']');
    if (input) {
      if (input.type === 'checkbox') {
        input.checked = Boolean(value);
      } else if (input.type === 'radio') {
        input.checked = input.value === value;
      } else {
        input.value = value;
      }
    }
  });
};"
            result="Form data manipulation helpers"
            explanation="Extracts and sets form data with support for multiple values and different input types"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Local Storage with Expiry"
            code="const storage = {
  set: (key, value, expiryHours = 24) => {
    const item = {
      value,
      expiry: Date.now() + (expiryHours * 60 * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return parsed.value;
  },
  
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};"
            result="Local storage with automatic expiry"
            explanation="Enhanced localStorage with automatic expiration and type safety"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Element Traversal"
            code="const findParent = (element, selector) => {
  let parent = element.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
};

const findSiblings = (element, selector = '*') => {
  const siblings = [];
  let sibling = element.previousElementSibling;
  
  while (sibling) {
    if (sibling.matches(selector)) {
      siblings.unshift(sibling);
    }
    sibling = sibling.previousElementSibling;
  }
  
  sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) {
      siblings.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }
  
  return siblings;
};"
            result="Element traversal utilities"
            explanation="Finds parent elements and siblings with selector filtering"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Element Visibility Toggle"
            code="const toggleVisibility = (element, show = true) => {
  if (show) {
    element.style.display = '';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
  } else {
    element.style.display = 'none';
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
  }
};

const fadeToggle = async (element, show = true) => {
  if (show) {
    element.style.display = '';
    await new Promise(resolve => setTimeout(resolve, 10));
    element.style.opacity = '1';
  } else {
    element.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 300));
    element.style.display = 'none';
  }
};"
            result="Element visibility control"
            explanation="Toggles element visibility with instant and fade animations"
          />
        </div>

        <div className="example-card">
          <CodeBlock 
            title="Element Cloning"
            code="const cloneElement = (element, deep = true) => {
  const clone = element.cloneNode(deep);
  
  // Remove IDs to avoid duplicates
  clone.querySelectorAll('[id]').forEach(el => {
    el.removeAttribute('id');
  });
  
  // Update event listeners if needed
  const newEventListeners = [];
  element._eventListeners?.forEach(listener => {
    const newListener = { ...listener };
    clone.addEventListener(listener.type, newListener.handler, listener.options);
    newEventListeners.push(newListener);
  });
  
  clone._eventListeners = newEventListeners;
  return clone;
};"
            result="Safe element cloning"
            explanation="Clones elements while handling IDs and event listeners properly"
          />
        </div>
      </div>
    </div>
  );
};

export default DOMTricks;
