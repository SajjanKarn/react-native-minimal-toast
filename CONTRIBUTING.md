# Contributing to react-native-minimal-toast

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to foster an open and welcoming environment.

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git
- A code editor (VS Code recommended)

### Setting Up the Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-native-minimal-toast.git
   cd react-native-minimal-toast
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Building the Package

```bash
npm run build
```

This compiles TypeScript files from `src/` to `dist/`.

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting conventions
- Keep functions small and focused
- Add JSDoc comments for public APIs

### Testing Your Changes

Since this is a React Native package, you should test it in an actual React Native or Expo project:

1. **Build the package:**
   ```bash
   npm run build
   ```

2. **Pack the package:**
   ```bash
   npm pack
   ```

3. **Install in a test project:**
   ```bash
   # In your test React Native/Expo project
   npm install /path/to/react-native-minimal-toast-1.0.0.tgz
   ```

4. **Test thoroughly:**
   - Test on iOS and Android
   - Test with Expo Go
   - Test all toast types (success, error, info)
   - Test different durations
   - Test edge cases (rapid calls, unmounting, etc.)

## Making Changes

### What to Contribute

We welcome:
- 🐛 Bug fixes
- ✨ New features (please discuss in an issue first)
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance improvements

### Guidelines

1. **Keep it minimal** - This package aims to stay lightweight
2. **No native dependencies** - Must work with Expo Go
3. **Maintain TypeScript types** - All exports should be properly typed
4. **Update documentation** - Update README.md if you change the API
5. **Test on multiple platforms** - Ensure iOS, Android, and Web compatibility

### Commit Messages

Use clear and descriptive commit messages:

```
feat: add support for custom colors
fix: resolve toast stacking issue
docs: update installation instructions
refactor: simplify toast animation logic
```

Format: `type: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Submitting Changes

1. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub

3. **Fill out the PR template** with:
   - Description of changes
   - What issue it fixes (if applicable)
   - Testing performed
   - Screenshots/videos (for UI changes)

4. **Wait for review** - Maintainers will review and provide feedback

## Pull Request Review Process

- PRs require at least one approval
- CI checks must pass
- All discussions must be resolved
- Maintainers may request changes

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Make sure you're using the latest version
3. Test on a minimal reproduction case

### Creating a Bug Report

Include:
- Package version
- React Native/Expo version
- Platform (iOS/Android/Web)
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Code sample or repository link

## Feature Requests

Open an issue with:
- Clear description of the feature
- Why it would be useful
- Potential implementation approach
- Examples of similar features in other libraries

## Questions?

- Open a GitHub Discussion for general questions
- Open an issue for bugs or feature requests
- Check existing issues and discussions first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
