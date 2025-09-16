# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

ICB (Image Comparison Bench) is a web application for benchmarking and comparing image processing algorithms and techniques. The project is designed to provide a comprehensive platform for comparing different image processing algorithms, benchmarking performance metrics, visualizing comparison results, and managing test datasets.

## Technology Stack

Based on the .gitignore configuration, this project is designed to support:
- **Frontend**: JavaScript/TypeScript with Node.js (npm/yarn package management)
- **Backend**: Python (with virtual environments)
- **Build Tools**: Modern web bundlers (dist/build outputs)
- **Image Processing**: Extensive image format support (.jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp)

## Project Structure

```
icb-webapp/
├── src/           # Source code (currently empty - to be implemented)
├── tests/         # Test files (currently empty)
├── data/          # Test datasets and sample images (currently empty)
├── docs/          # Documentation (currently empty)
├── assets/        # Static assets - sample images preserved in git
└── README.md      # Project documentation
```

## Development Commands

### Project Setup
Since the project structure suggests multi-language support, typical setup commands would include:

**For Node.js/JavaScript components:**
```bash
npm install
# or
yarn install
```

**For Python components:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Building the Project
Based on the gitignore patterns, expected build commands:
```bash
# For web components
npm run build
# or
yarn build

# Outputs will be in dist/ or build/ directories
```

### Running Tests
```bash
# JavaScript/TypeScript tests
npm test
# or
yarn test

# Python tests
python -m pytest tests/
# or
pytest

# Run specific test file
pytest tests/test_specific.py
```

### Development Server
```bash
# Start development server (typical web app)
npm run dev
# or
yarn dev
```

### Linting and Code Quality
```bash
# JavaScript/TypeScript linting
npm run lint
eslint src/

# Python linting
flake8 src/
black src/
pylint src/
```

## Architecture Considerations

### Image Processing Focus
- The project is specifically designed for image comparison benchmarking
- Large image files are gitignored except for samples in assets/ and docs/images/
- Support for multiple image formats suggests comprehensive image processing capabilities
- The data/ directory is intended for test datasets

### Multi-Language Architecture
- Frontend likely handles visualization and user interface
- Backend (Python) likely handles heavy image processing algorithms
- Clear separation between source code, tests, and data directories
- Environment variable support (.env files) suggests configurable deployment

### Performance and Benchmarking
- The focus on "benchmarking" suggests performance measurement capabilities
- Test datasets in data/ directory for consistent algorithm comparison
- Separate assets/ directory for static resources vs. dynamic test data

## Development Guidelines

### Image Handling
- Place sample/reference images in assets/ with "sample" prefix to keep in git
- Use data/ directory for large test datasets (gitignored)
- Documentation images go in docs/images/ (preserved in git)

### Environment Configuration
- Use .env files for configuration (gitignored for security)
- Support for multiple environments (.env.local, .env.development.local, etc.)

### Code Organization
- Keep source code in src/ directory
- Write tests in tests/ directory with clear naming
- Document algorithms and benchmarks in docs/

### Performance Considerations
- Expect to work with large image datasets
- Consider memory usage when implementing image processing algorithms
- Cache and temporary files should go in tmp/ or temp/ (gitignored)

## File Management

### Ignored Files
- Node modules and Python virtual environments
- Build outputs and compiled files
- Large image files (except samples and documentation)
- Environment configuration files
- IDE-specific files and OS-generated files
- Temporary files and logs
- Test coverage reports

### Preserved Files
- Sample images in assets/ with "sample" prefix
- Documentation images in docs/images/
- Source code and tests
- Configuration templates and documentation
