import React, { createContext, useContext, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Toast } from "./Toast";
import { ToastOptions, ToastType } from "./types";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ContextType {
  show: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ContextType | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = toastId++;
      const type = options?.type ?? "info";
      const duration = options?.duration ?? 3000;

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <View style={styles.container}>
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
});
