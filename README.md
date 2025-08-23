# 🚀 JavaScript Tricks & One-Liners Tutorial

A comprehensive, interactive tutorial showcasing powerful JavaScript tricks, one-liners, and advanced programming techniques. Built with React and TypeScript for an optimal learning experience.

## ✨ Features

### 🎯 **Comprehensive Content**
- **10 Categories** of JavaScript tricks and techniques
- **150+ Examples** with live code execution
- **Detailed Explanations** for each trick
- **Real-time Results** showing actual output

### 🔍 **Smart Search & Navigation**
- **Instant Search** across all trick categories
- **Filter by name or description**
- **Keyboard shortcuts** for quick navigation
- **Responsive category navigation**

### 🌙 **Dark Mode Support**
- **Toggle between light and dark themes**
- **Persistent theme preference** (saved to localStorage)
- **Optimized color schemes** for both modes
- **Smooth transitions** between themes

### ⌨️ **Keyboard Shortcuts**
- **Ctrl+K / Cmd+K**: Focus search bar
- **Ctrl+D / Cmd+D**: Toggle dark mode
- **Escape**: Clear search and unfocus

### 📋 **Interactive Code Examples**
- **One-click copy** to clipboard
- **Live code execution** with real results
- **Syntax highlighting** for better readability
- **Error handling** for invalid code

## 📚 Categories

### 1. **Array Manipulation** 🔢
- Remove duplicates, flatten arrays, shuffle
- Group by property, chunk arrays, count occurrences
- Array intersection, union, rotation
- Advanced array transformations

### 2. **String Processing** 📝
- Reverse strings, capitalize, title case
- Palindrome detection, anagram checking
- String masking, slug generation
- Phone number formatting, word counting

### 3. **Object Operations** 📦
- Deep cloning, property manipulation
- Object merging, flattening, inversion
- Safe property access, validation
- Dynamic property names, computed properties

### 4. **Number Operations** 🔢
- Random number generation, rounding
- Prime number detection, factorial calculation
- Binary conversion, distance calculation
- Currency formatting, percentage calculations

### 5. **Functional Programming** ⚡
- Currying, composition, partial application
- Memoization, trampolining, monads
- Point-free style, function decorators
- Immutable updates, lenses

### 6. **Async Operations** ⏱️
- Promise timeouts, retry with backoff
- Async queues, promise pools
- Async generators, event emitters
- Debounced async functions, polling

### 7. **DOM Manipulation** 🌐
- Query selectors, element creation
- Event delegation, intersection observers
- Smooth scrolling, clipboard operations
- CSS variables, animations, form handling

### 8. **Performance & Debugging** ⚡
- Debouncing, throttling, memoization
- Lazy loading, virtual scrolling
- Web workers, request animation frame
- Memory leak prevention, performance monitoring

### 9. **LeetCode Style** 🏆
- Two pointers, sliding window
- Binary search, DFS/BFS
- Dynamic programming, hash maps
- Stacks, monotonic properties, union find

### 10. **Advanced Patterns** 🚀
- Currying, composition, partial application
- Proxies, symbols, generators
- Decorators, reflect API, tagged templates
- Async iterators, weak references

## 🛠️ Technical Stack

- **React 18** with TypeScript
- **Modern CSS** with gradients and animations
- **Local Storage** for theme persistence
- **Clipboard API** for code copying
- **Responsive Design** for all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd javascript-tricks-playground

# Install dependencies
npm install

# Start the development server
npm start
```

### Build for Production
```bash
npm run build
```

## 🎨 Customization

### Adding New Tricks
1. Navigate to the appropriate component file in `src/components/`
2. Add your trick to the examples array
3. Include title, description, code, result, and explanation

### Styling
- Main styles: `src/App.css`
- Dark mode styles included
- Responsive design with mobile-first approach

## 📱 Responsive Design

The app is fully responsive and works great on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

## 🔧 Development

### Project Structure
```
src/
├── components/          # Trick category components
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── App.css             # Main styles
└── index.tsx           # Application entry point
```

### Key Features Implementation
- **Search**: Real-time filtering with debounced input
- **Dark Mode**: CSS custom properties with localStorage persistence
- **Keyboard Shortcuts**: Global event listeners with cleanup
- **Code Copying**: Clipboard API with fallback support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your JavaScript tricks
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern React patterns
- Inspired by JavaScript community best practices
- Designed for optimal learning experience

---

**Happy coding! 🎉**

*Master JavaScript one trick at a time.*