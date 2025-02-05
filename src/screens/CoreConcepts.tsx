import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const CoreConcepts = () => {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedRef = useAnimatedRef<Animated.View>();

  const opacity = useDerivedValue(() => {
    return Math.sin((rotation.value * Math.PI) / 180) / 2 + 0.5;
  });

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
        {
          rotate: `${rotation.value}deg`,
        },
        {
          scale: scale.value,
        },
      ],
      opacity: opacity.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 1 / scale.value,
        },
      ],
    };
  });

  const handleStartAnimation = () => {
    offset.value = withSpring(Math.random() * 200 - 100);
    rotation.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
      false,
    );

    scale.value = withRepeat(withTiming(1.5, {duration: 1000}), -1, true);
  };

  const handleStopAnimation = () => {
    cancelAnimation(offset);
    cancelAnimation(rotation);
    cancelAnimation(scale);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Core Concepts
      </Text>

      <Animated.View ref={animatedRef} style={[styles.box, boxStyle]}>
        <Animated.Text
          style={[styles.sectionTitle, textStyle, {color: '#fff'}]}>
          Animated Box
        </Animated.Text>
      </Animated.View>
      <View style={styles.btnContainer}>
        <Pressable onPress={handleStartAnimation} style={styles.btn}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>
            Start Animation
          </Text>
        </Pressable>
        <Pressable onPress={handleStopAnimation} style={styles.btn}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>
            Stop Animation
          </Text>
        </Pressable>
      </View>
    </View>
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
    backgroundColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  btnContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  btn: {
    backgroundColor: '#16a34a',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default CoreConcepts;
