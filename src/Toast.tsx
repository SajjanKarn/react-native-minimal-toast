import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { ToastType } from "./types";

interface Props {
  message: string;
  type: ToastType;
}

const colors = {
  success: "#16a34a",
  error: "#dc2626",
  info: "#2563eb",
};

export function Toast({ message, type }: Props) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.toast, { opacity, backgroundColor: colors[type] }]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "500",
  },
});
