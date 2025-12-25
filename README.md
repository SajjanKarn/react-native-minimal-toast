# react-native-minimal-toast

A minimal, Expo-friendly toast notification component for React Native with zero dependencies.

## Features

- 🚀 Zero native dependencies - works with Expo Go
- 🎨 Simple and customizable
- 📦 Tiny bundle size (~4KB)
- 💪 TypeScript support
- ⚡ Easy to use with React Context API
- 🎯 Three built-in types: success, error, and info

## Installation

```bash
npm install react-native-minimal-toast
```

or

```bash
yarn add react-native-minimal-toast
```

## Usage

### 1. Wrap your app with ToastProvider

```tsx
import { ToastProvider } from 'react-native-minimal-toast';

export default function App() {
  return (
    <ToastProvider>
      {/* Your app components */}
    </ToastProvider>
  );
}
```

### 2. Use the useToast hook

```tsx
import { useToast } from 'react-native-minimal-toast';

function MyComponent() {
  const toast = useToast();

  const handlePress = () => {
    toast.show('Hello from toast!', { type: 'success', duration: 3000 });
  };

  return (
    <Button title="Show Toast" onPress={handlePress} />
  );
}
```

## API

### ToastProvider

Wrap your app with this provider to enable toast notifications.

```tsx
<ToastProvider>
  {children}
</ToastProvider>
```

### useToast()

Hook that returns toast methods.

```tsx
const toast = useToast();
```

#### toast.show(message, options?)

Show a toast notification.

**Parameters:**

- `message` (string): The message to display
- `options` (optional):
  - `type`: `'success' | 'error' | 'info'` (default: `'info'`)
  - `duration`: number in milliseconds (default: `3000`)
  - `position`: `'top' | 'bottom'` (default: `'bottom'`)

**Examples:**

```tsx
// Simple info toast
toast.show('Something happened');

// Success toast with custom duration
toast.show('Saved successfully!', { type: 'success', duration: 2000 });

// Error toast
toast.show('An error occurred', { type: 'error' });
```

## TypeScript

This package includes TypeScript definitions out of the box.

```typescript
import type { ToastOptions, ToastType } from 'react-native-minimal-toast';
```

## Example

```tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ToastProvider, useToast } from 'react-native-minimal-toast';

function HomeScreen() {
  const toast = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Success Toast"
        onPress={() => toast.show('Success!', { type: 'success' })}
      />
      <Button
        title="Error Toast"
        onPress={() => toast.show('Error occurred', { type: 'error' })}
      />
      <Button
        title="Info Toast"
        onPress={() => toast.show('FYI...', { type: 'info' })}
      />
    </View>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <HomeScreen />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    padding: 20,
  },
});
```

## Compatibility

- ✅ Expo (SDK 49+)
- ✅ React Native 0.70+
- ✅ iOS
- ✅ Android
- ✅ Web

## License

MIT © Sajjan Karn

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
