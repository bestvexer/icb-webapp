# Release Notes

## v1.0.0 - Initial Release (2024-09-16)

### 🎉 Initial Features

**Core Image Comparison**
- Interactive draggable slider for before/after image comparison
- Support for multiple image formats: JPG, PNG, GIF, BMP, TIFF, WebP
- Real-time image metadata display (dimensions, file size, type)
- Click-to-move and drag-to-compare functionality

**Advanced Controls**
- **Scale to Fit**: Automatically resize images to fit viewport
- **1:1 Ratio**: View images at actual pixel size
- **Fullscreen Mode**: Immersive comparison with advanced controls

**Fullscreen Features**
- 7 discrete zoom levels (-3 to +3)
- Keyboard shortcuts:
  - `+/-`: Zoom in/out
  - `0`: Reset zoom
  - `ESC`: Exit fullscreen
  - `Arrow Keys`: Navigate when zoomed
- Smooth zoom transitions and pan controls

**Export & Download**
- Download comparison as PNG image
- Maintains aspect ratio and respects scale modes
- High-quality canvas-based rendering

**User Experience**
- Touch and mobile support
- Responsive design for all screen sizes
- Clean, professional interface
- Visual feedback for all interactions
- Smooth animations and transitions

**Developer Experience**
- Built with React 18 and Vite 5
- Modern ES6+ JavaScript
- CSS3 with custom properties
- Comprehensive documentation
- Apache 2.0 open source license

### 🛠️ Technical Details

- **Frontend**: React 18.2.0 with Hooks
- **Build Tool**: Vite 5.2.0
- **Image Processing**: HTML5 Canvas API
- **Screenshot**: html2canvas library
- **Styling**: CSS3 with CSS Variables

### 🚀 Getting Started

```bash
git clone https://github.com/bestvexer/icb-webapp.git
cd icb-webapp
npm install
npm run dev
```

### 🎯 Use Cases

- Web development: Compare website designs before/after changes
- Image processing: Evaluate filter effects and adjustments
- Quality assurance: Visual regression testing
- Photography: Before/after photo editing comparisons

### 📈 What's Next

See our [roadmap in CONTRIBUTING.md](./CONTRIBUTING.md) for planned features including:
- Automated testing infrastructure
- Additional export formats
- Batch comparison mode
- Performance optimizations