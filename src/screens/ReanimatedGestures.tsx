import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ContextType = {
  startX: number;
  startY: number;
};

const ReanimatedGestures: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
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
          Reanimated Gestures
        </Text>
        <Text
          style={[
            styles.sectionTitle,
            {fontSize: 18, marginVertical: 20, color: '#111827'},
          ]}>
          Drag the below box and release it
        </Text>
      </View>

      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      </PanGestureHandler>
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

export default ReanimatedGestures;
