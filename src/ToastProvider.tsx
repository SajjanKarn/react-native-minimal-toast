import React, { useState, createContext } from "react";
import { View } from "react-native";
import {
  ToastContextType,
  ToastProviderProps,
  ToastShowConfig,
  ToastState,
  ToastOptions,
  ToastPromiseMessages,
  ToastType,
} from "./types";
import { DEFAULT_TOAST_OPTIONS } from "./constants";
import { ToastComponent } from "./ToastComponent";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
    ...DEFAULT_TOAST_OPTIONS,
  });

  const showToast = (config: ToastShowConfig): void => {
    const finalConfig = {
      ...DEFAULT_TOAST_OPTIONS,
      type: "info" as ToastType,
      ...config,
    };
    setToastState({
      visible: true,
      ...finalConfig,
    });
  };

  const hideToast = (): void => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };

  const handlePromise = async <T,>(
    promise: Promise<T>,
    messages: ToastPromiseMessages,
    options: ToastOptions = {}
  ): Promise<T> => {
    showToast({
      message: messages.loading,
      type: "info",
      duration: 0,
      ...options,
    });

    try {
      const result = await promise;
      hideToast();
      setTimeout(() => {
        showToast({ message: messages.success, type: "success", ...options });
      }, 100);
      return result;
    } catch (error) {
      hideToast();
      setTimeout(() => {
        showToast({ message: messages.error, type: "error", ...options });
      }, 100);
      throw error;
    }
  };

  const toast: ToastContextType = {
    show: showToast,
    hide: hideToast,
    success: (message: string, options: ToastOptions = {}) =>
      showToast({ message, type: "success", ...options }),
    error: (message: string, options: ToastOptions = {}) =>
      showToast({ message, type: "error", ...options }),
    warning: (message: string, options: ToastOptions = {}) =>
      showToast({ message, type: "warning", ...options }),
    info: (message: string, options: ToastOptions = {}) =>
      showToast({ message, type: "info", ...options }),
    promise: handlePromise,
  };

  return (
    <ToastContext.Provider value={toast}>
      <View style={{ flex: 1 }}>
        {children}
        <ToastComponent
          visible={toastState.visible}
          message={toastState.message}
          type={toastState.type}
          duration={toastState.duration}
          position={toastState.position}
          showCloseButton={toastState.showCloseButton}
          customStyle={toastState.customStyle}
          textStyle={toastState.textStyle}
          icon={toastState.icon}
          onHide={hideToast}
        />
      </View>
    </ToastContext.Provider>
  );
};
