import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  PanResponder,
} from "react-native";
import { ToastComponentProps } from "./types";
import {
  TOAST_CONFIGS,
  DEFAULT_ICONS,
  ANIMATION_DURATION,
  SWIPE_THRESHOLD,
  POSITION_OFFSET,
} from "./constants";

const { width } = Dimensions.get("window");

export const ToastComponent: React.FC<ToastComponentProps> = ({
  visible,
  message,
  type = "info",
  duration = 3000,
  onHide,
  position = "top",
  showCloseButton = true,
  customStyle = {},
  textStyle = {},
  icon,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(
    new Animated.Value(position === "top" ? -100 : 100)
  ).current;
  const panAnim = useRef(new Animated.ValueXY()).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = (): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (onHide) {
      onHide();
    }
  };

  const resetPosition = () => {
    Animated.spring(panAnim, {
      toValue: { x: 0, y: 0 },
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    if (duration > 0) {
      timerRef.current = setTimeout(hideToast, duration);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      },
      onPanResponderMove: Animated.event(
        [null, { dx: panAnim.x, dy: panAnim.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy, vx, vy } = gestureState;
        const horizontalSwipe = Math.abs(dx) > Math.abs(dy);
        const verticalSwipe = Math.abs(dy) > Math.abs(dx);

        if (
          horizontalSwipe &&
          (Math.abs(dx) > SWIPE_THRESHOLD.horizontal ||
            Math.abs(vx) > SWIPE_THRESHOLD.velocity)
        ) {
          hideToast();
          Animated.spring(panAnim.x, {
            toValue: dx > 0 ? width : -width,
            velocity: vx,
            tension: 20,
            friction: 5,
            useNativeDriver: true,
          }).start(() => {
            panAnim.setValue({ x: 0, y: 0 });
          });
        } else if (
          verticalSwipe &&
          (Math.abs(dy) > SWIPE_THRESHOLD.vertical ||
            Math.abs(vy) > SWIPE_THRESHOLD.velocity)
        ) {
          if (
            (position === "top" && dy < 0) ||
            (position === "bottom" && dy > 0)
          ) {
            hideToast();
            Animated.spring(panAnim.y, {
              toValue: position === "top" ? -200 : 200,
              velocity: vy,
              tension: 20,
              friction: 5,
              useNativeDriver: true,
            }).start(() => {
              panAnim.setValue({ x: 0, y: 0 });
            });
          } else {
            resetPosition();
          }
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      slideAnim.setValue(position === "top" ? -100 : 100);
      panAnim.setValue({ x: 0, y: 0 });

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION.show,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION.show,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        timerRef.current = setTimeout(hideToast, duration);
        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        };
      }
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION.hide,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: position === "top" ? -100 : 100,
          duration: ANIMATION_DURATION.hide,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, duration, position]);

  if (!visible) {
    return null;
  }

  const toastConfig = TOAST_CONFIGS[type] || TOAST_CONFIGS.info;
  const defaultIconSymbol = DEFAULT_ICONS[type] || DEFAULT_ICONS.info;

  const renderIcon = () => {
    if (icon) {
      return icon;
    }
    return (
      <Text style={{ fontSize: 24, fontWeight: "bold", color: toastConfig.iconColor }}>
        {defaultIconSymbol}
      </Text>
    );
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { translateX: panAnim.x },
            { translateY: panAnim.y },
          ],
          top:
            position === "top"
              ? Platform.OS === "ios"
                ? POSITION_OFFSET.ios
                : (StatusBar.currentHeight || 0) + POSITION_OFFSET.android
              : undefined,
          bottom: position === "bottom" ? POSITION_OFFSET.bottom : undefined,
          backgroundColor: toastConfig.backgroundColor,
        },
        customStyle,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>{renderIcon()}</View>

        <Text style={[styles.message, textStyle]} numberOfLines={3}>
          {message}
        </Text>

        {showCloseButton && (
          <TouchableOpacity
            onPress={hideToast}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.closeIcon, { color: toastConfig.iconColor }]}>
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
