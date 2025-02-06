import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const COLORS = ['#b58df1', '#fa7f7c', '#ffe780', '#82cab2'];

const ReanimatedGesturesUpdated: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const previousTranslateX = useSharedValue(0);
  const previousTranslateY = useSharedValue(0);

  const colorIndex = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      if (colorIndex.value > COLORS.length) {
        colorIndex.value =
          colorIndex.value % 1 === 0 ? 1 : colorIndex.value % 1;
      }

      const nextIndex = Math.ceil(colorIndex.value + 1);
      colorIndex.value = withTiming(nextIndex, {duration: 250});
    })
    .runOnJS(true);

  const trackPanGesture = Gesture.Pan()
    .onStart(() => {
      previousTranslateX.value = translateX.value;
      previousTranslateY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = previousTranslateX.value + event.translationX;
      translateY.value = previousTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const tapBackgroundColorChange = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorIndex.value,
        [0, ...COLORS.map((_, i) => i + 1), COLORS.length + 1],
        [COLORS[COLORS.length - 1], ...COLORS, COLORS[0]],
      ),
    };
  });

  return (
    <GestureHandlerRootView style={styles.sectionContainer}>
      <View>
        <Text
          style={[
            styles.sectionTitle,
            {fontSize: 18, marginVertical: 20, color: '#111827'},
          ]}>
          Reanimated Gestures Updated
        </Text>
        <Text
          style={[
            styles.sectionTitle,
            {fontSize: 18, marginVertical: 20, color: '#111827'},
          ]}>
          Drag the below box and release it
        </Text>
      </View>

      <GestureDetector gesture={Gesture.Exclusive(trackPanGesture, tapGesture)}>
        <Animated.View
          style={[
            styles.box,
            animatedStyle,
            tapBackgroundColorChange,
          ]}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
    minHeight: '100%',
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    // letterSpacing: 2,
  },

  box: {
    width: 150,
    height: 150,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default ReanimatedGesturesUpdated;
