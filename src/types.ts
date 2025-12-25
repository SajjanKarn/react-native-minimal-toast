export type ToastType = "success" | "error" | "info";

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: "top" | "bottom";
}
