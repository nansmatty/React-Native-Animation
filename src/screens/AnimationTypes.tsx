import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimationTypes = () => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          rotate: `${rotate.value}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  //Reset Animation
  const handleResetAnimation = () => {
    translateX.value = withTiming(0);
    scale.value = withSpring(1);
  };

  //Timing Animation
  const handleTimingAnimation = () => {
    translateX.value = withTiming(150, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
  };

  //Spring Animation
  const handleSpringAnimation = () => {
    scale.value = withSpring(1.3, {
      damping: 10,
      stiffness: 100,
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Animation Types
      </Text>

      <Animated.View style={[styles.box, boxStyle]}></Animated.View>

      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleTimingAnimation}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Timing</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleSpringAnimation}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Spring</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Decay</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Sequence</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Repeat</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Delay</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleResetAnimation}>
          <Text style={[styles.sectionTitle, {color: '#fff'}]}>Reset</Text>
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
    justifyContent: 'center',
    marginVertical: 50,
    flexWrap: 'wrap',
  },
  btn: {
    backgroundColor: '#16a34a',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default AnimationTypes;
