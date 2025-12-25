import { ToastType, ToastConfig, ToastOptions } from "./types";

// Default Unicode icons as strings
export const DEFAULT_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

// Toast type configurations
export const TOAST_CONFIGS: Record<ToastType, Omit<ToastConfig, "icon">> = {
  success: {
    backgroundColor: "#4CAF50",
    iconColor: "#FFFFFF",
  },
  error: {
    backgroundColor: "#F44336",
    iconColor: "#FFFFFF",
  },
  warning: {
    backgroundColor: "#FF9800",
    iconColor: "#FFFFFF",
  },
  info: {
    backgroundColor: "#2196F3",
    iconColor: "#FFFFFF",
  },
};

// Default toast options
export const DEFAULT_TOAST_OPTIONS: Required<Omit<ToastOptions, 'icon'>> = {
  duration: 3000,
  position: "top",
  showCloseButton: true,
  customStyle: {},
  textStyle: {},
};

// Animation constants
export const ANIMATION_DURATION = {
  show: 300,
  hide: 250,
};

export const SWIPE_THRESHOLD = {
  horizontal: 100,
  vertical: 50,
  velocity: 0.5,
};

export const POSITION_OFFSET = {
  ios: 50,
  android: 10,
  bottom: 50,
};
