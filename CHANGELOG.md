# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-25

### Added
- Initial release of react-native-minimal-toast
- Toast notification component with Context API
- Three toast types: success, error, and info
- Customizable duration
- TypeScript support
- Zero native dependencies (Expo-friendly)
- Animated toast entrance with fade-in effect
- Automatic dismissal after specified duration
- `ToastProvider` wrapper component
- `useToast` hook for showing toasts
- Support for iOS, Android, and Web platforms

### Features
- Simple API: `toast.show(message, options)`
- Position control (top/bottom)
- Customizable duration (default 3000ms)
- Built-in color schemes for each toast type
- TypeScript definitions included
