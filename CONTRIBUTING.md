# Contributing to ICB Image Comparison Bench

Thank you for your interest in contributing to ICB! We welcome contributions from developers of all skill levels. This document provides guidelines for contributing to the project.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Install dependencies**: `npm install`
4. **Start development server**: `npm run dev`
5. **Make your changes**
6. **Test your changes** thoroughly
7. **Submit a Pull Request**

## 🛠️ Development Setup

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/icb-webapp.git
cd icb-webapp

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production
```bash
npm run build
npm run preview
```

## 📋 Types of Contributions

We welcome several types of contributions:

### 🐛 Bug Reports
- Use the GitHub issue tracker
- Include steps to reproduce
- Provide browser/OS information
- Include screenshots if applicable

### 💡 Feature Requests
- Search existing issues first
- Describe the feature clearly
- Explain the use case and benefits
- Consider implementation complexity

### 🔧 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Documentation improvements
- Test coverage improvements

### 📚 Documentation
- README improvements
- Code comments
- API documentation
- Usage examples
- Tutorial content

## 🏗️ Development Guidelines

### Code Style
- Use consistent formatting (we recommend Prettier)
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

### React/JavaScript Guidelines
```javascript
// ✅ Good: Clear component structure
const ImageComparer = ({ beforeImage, afterImage, onSliderChange }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  
  const handleSliderMove = useCallback((position) => {
    setSliderPosition(position);
    onSliderChange?.(position);
  }, [onSliderChange]);

  return (
    // Component JSX
  );
};

// ❌ Avoid: Unclear naming and missing dependencies
const Component = ({ img1, img2, cb }) => {
  const [pos, setPos] = useState(50);
  // Missing useCallback, unclear variable names
};
```

### CSS Guidelines
- Use CSS custom properties for theming
- Follow BEM naming convention when applicable
- Ensure responsive design
- Test across different browsers

### File Structure
```
src/
├── components/          # Reusable React components
│   ├── ComponentName.jsx
│   └── ComponentName.css
├── utils/              # Utility functions
├── hooks/              # Custom React hooks (if any)
└── assets/             # Static assets
```

## 🧪 Testing

### Manual Testing Checklist
Before submitting a PR, please test:

- [ ] Image upload and preview functionality
- [ ] Slider drag and click interactions
- [ ] All scale modes (Scale to Fit, 1:1 Ratio, Fullscreen)
- [ ] Keyboard shortcuts in fullscreen mode
- [ ] Download functionality
- [ ] Mobile/touch interactions
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design on different screen sizes

### Future: Automated Testing
We plan to add automated testing. Contributions to set up testing infrastructure are welcome!

## 📝 Pull Request Process

### Before Creating a PR
1. **Create an issue** first (for non-trivial changes)
2. **Fork the repository** and create a feature branch
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Follow commit message conventions**

### PR Guidelines
- Use descriptive titles
- Reference related issues (`Fixes #123`)
- Provide clear description of changes
- Include screenshots for UI changes
- Keep PRs focused and reasonably sized

### Commit Message Format
```
type(scope): brief description

Detailed explanation if needed

Fixes #123
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code formatting changes
- `refactor`: Code restructuring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests

**Examples:**
```
feat(slider): add keyboard navigation support

Add arrow key support for slider movement in fullscreen mode.
Users can now use left/right arrows to move the slider.

Fixes #45
```

## 🎯 Priority Areas for Contribution

### High Priority
- [ ] Automated testing setup (Jest, React Testing Library)
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Performance optimizations for large images
- [ ] Mobile experience enhancements

### Medium Priority
- [ ] Additional export formats (JPEG, WebP)
- [ ] Batch comparison mode
- [ ] Image filters and adjustments
- [ ] Comparison analytics/metrics

### Low Priority
- [ ] Themes and customization
- [ ] Plugin system
- [ ] Advanced zoom controls
- [ ] Cloud storage integration

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - Browser name and version
   - Operating system
   - Screen resolution
   - Device type (desktop/mobile/tablet)

2. **Steps to Reproduce**
   - Numbered list of exact steps
   - Expected vs actual behavior
   - Screenshots or screen recordings

3. **Additional Context**
   - Image file types and sizes used
   - Console error messages
   - Network connectivity issues

## 💡 Feature Requests

For feature requests, please provide:

1. **Problem Description**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: What other solutions did you consider?
4. **Use Cases**: Who would benefit and how?
5. **Implementation Ideas**: Any technical suggestions?

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume positive intent
- Respect different viewpoints and experiences

### Unacceptable Behavior
- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing private information
- Spam or off-topic discussions

## 📞 Getting Help

Need help contributing? Here are some options:

1. **GitHub Discussions**: Ask questions and discuss ideas
2. **GitHub Issues**: Report bugs or request features
3. **Code Reviews**: Learn from feedback on your PRs

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors graph
- Release notes for significant contributions

## 📄 License

By contributing to ICB, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to ICB Image Comparison Bench! Your efforts help make this tool better for everyone. 🚀