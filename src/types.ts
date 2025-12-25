import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition = "top" | "bottom";

export interface ToastConfig {
  backgroundColor: string;
  icon?: ReactNode;
  iconColor: string;
}

export interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
  showCloseButton?: boolean;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: ReactNode;
}

export interface ToastShowConfig extends ToastOptions {
  message: string;
  type?: ToastType;
}

export interface ToastState extends Required<Omit<ToastShowConfig, 'icon'>> {
  visible: boolean;
  icon?: ReactNode;
}

export interface ToastPromiseMessages {
  loading: string;
  success: string;
  error: string;
}

export interface ToastContextType {
  show: (config: ToastShowConfig) => void;
  hide: () => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages,
    options?: ToastOptions
  ) => Promise<T>;
}

export interface ToastComponentProps {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  onHide: () => void;
  position: ToastPosition;
  showCloseButton: boolean;
  customStyle: ViewStyle;
  textStyle: TextStyle;
  icon?: ReactNode;
}

export interface ToastProviderProps {
  children: ReactNode;
}
