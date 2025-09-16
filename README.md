# ICB Image Comparison Bench

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF.svg)](https://vitejs.dev/)

A powerful, interactive web application for side-by-side image comparison with advanced features like draggable sliders, multiple scale modes, and fullscreen viewing.

> **Live Demo**: [Try ICB Image Comparison Bench](https://bestvexer.github.io/icb-webapp/) (Available once GitHub Pages deployment completes)

## ✨ Features

### 🎯 Core Functionality
- **Interactive Slider**: Drag or click to compare before/after images
- **File Upload**: Support for JPG, PNG, GIF, BMP, TIFF, and WebP formats
- **Real-time Preview**: See image metadata (dimensions, file size, type)
- **Download Comparisons**: Export your comparison as a PNG image

### 🔧 Advanced Controls
- **Multiple Scale Modes**:
  - **Scale to Fit**: Automatically resize images to fit the viewport
  - **1:1 Ratio**: View images at their actual pixel size
  - **Fullscreen**: Immersive comparison experience with zoom controls
- **Keyboard Shortcuts**:
  - `ESC`: Exit fullscreen mode
  - `+/-`: Zoom in/out in fullscreen mode
  - `0`: Reset zoom level
  - `Arrow Keys`: Navigate in fullscreen mode
- **Touch Support**: Full mobile and tablet compatibility
- **Zoom Levels**: 7 discrete zoom levels in fullscreen mode

### 🎨 User Experience
- Clean, professional interface
- Responsive design for all screen sizes
- Smooth animations and transitions
- Intuitive drag-and-drop functionality
- Visual feedback for all interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bestvexer/icb-webapp.git
   cd icb-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### Basic Comparison
1. Click "Choose Files" to upload your before and after images
2. Use the draggable slider to compare the images
3. Select different scale modes from the dropdown
4. Download your comparison using the "Download as PNG" button

### Fullscreen Mode
1. Select "Fullscreen" from the scale mode dropdown
2. Use keyboard shortcuts for navigation:
   - `+/-` to zoom in/out
   - `0` to reset zoom
   - `ESC` to exit fullscreen
   - Arrow keys to scroll when zoomed

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `ESC` | Exit fullscreen mode |
| `+` | Zoom in |
| `-` | Zoom out |
| `0` | Reset zoom level |
| `↑↓←→` | Navigate in fullscreen |

## 🏗️ Project Structure

```
icb-webapp/
├── src/
│   ├── components/          # React components
│   │   ├── ImageComparer.jsx    # Main comparison component
│   │   ├── Toolbar.jsx          # Control toolbar
│   │   ├── FullscreenModal.jsx  # Fullscreen mode
│   │   └── ScaleDropdown.jsx    # Scale mode selector
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── assets/                 # Project assets and samples
├── docs/                   # Documentation
├── tests/                  # Test files
└── README.md              # This file
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Technology Stack

- **Frontend**: React 18.2.0 with Hooks
- **Build Tool**: Vite 5.2.0
- **Styling**: CSS3 with CSS Variables
- **Image Processing**: HTML5 Canvas API
- **Screenshot**: html2canvas library

## 🎯 Use Cases

### Web Development
- Compare website designs before/after changes
- A/B test different UI implementations
- Review responsive design across breakpoints

### Image Processing
- Evaluate filter effects and adjustments
- Compare compression algorithms
- Assess image enhancement techniques

### Quality Assurance
- Visual regression testing
- Design approval workflows
- Client presentation and feedback

### Photography & Design
- Before/after photo editing comparisons
- Logo design iterations
- Color correction evaluations

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Guide
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Image processing powered by HTML5 Canvas API
- Screenshot functionality via [html2canvas](https://html2canvas.hertzen.com/)

## 📧 Support

If you have questions or need help, please:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

**Made with ❤️ for the developer community**
