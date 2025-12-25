import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { ToastProvider, useToast } from "react-native-minimal-toast";

function HomeScreen() {
  const toast = useToast();

  const simulatePromise = (shouldSucceed: boolean) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) {
          resolve("Data loaded successfully");
        } else {
          reject(new Error("Failed to load data"));
        }
      }, 2000);
    });
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>React Native Toast Demo</Text>
      <Text style={styles.subtitle}>Zero Dependencies • Swipe to Dismiss</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Toasts</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.successButton]}
            onPress={() => toast.success("Success! Operation completed")}
          >
            <Text style={styles.buttonText}>✓ Success Toast</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.errorButton]}
            onPress={() => toast.error("Error! Something went wrong")}
          >
            <Text style={styles.buttonText}>✕ Error Toast</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.warningButton]}
            onPress={() => toast.warning("Warning: Please check your input")}
          >
            <Text style={styles.buttonText}>⚠ Warning Toast</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.infoButton]}
            onPress={() => toast.info("Info: This is a notification")}
          >
            <Text style={styles.buttonText}>ℹ Info Toast</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Positions & Duration</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.customButton]}
            onPress={() =>
              toast.show({
                message: "Toast at the bottom",
                type: "info",
                position: "bottom",
              })
            }
          >
            <Text style={styles.buttonText}>Bottom Position</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.customButton]}
            onPress={() =>
              toast.show({
                message: "This toast lasts 5 seconds",
                type: "info",
                duration: 5000,
              })
            }
          >
            <Text style={styles.buttonText}>5 Second Duration</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.customButton]}
            onPress={() =>
              toast.show({
                message: "No close button",
                type: "success",
                showCloseButton: false,
              })
            }
          >
            <Text style={styles.buttonText}>No Close Button</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promise Support</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.promiseButton]}
            onPress={() =>
              toast.promise(simulatePromise(true), {
                loading: "Loading data...",
                success: "Data loaded successfully!",
                error: "Failed to load data",
              })
            }
          >
            <Text style={styles.buttonText}>Promise Success</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.promiseButton]}
            onPress={() =>
              toast.promise(simulatePromise(false), {
                loading: "Loading data...",
                success: "Data loaded successfully!",
                error: "Failed to load data",
              })
            }
          >
            <Text style={styles.buttonText}>Promise Error</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
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
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  section: {
    width: "100%",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successButton: {
    backgroundColor: "#4CAF50",
  },
  errorButton: {
    backgroundColor: "#F44336",
  },
  warningButton: {
    backgroundColor: "#FF9800",
  },
  infoButton: {
    backgroundColor: "#2196F3",
  },
  customButton: {
    backgroundColor: "#9C27B0",
  },
  promiseButton: {
    backgroundColor: "#00BCD4",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
