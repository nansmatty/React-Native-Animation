import {Animated, Button, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';

const CombinedAnimationScreen = () => {
  const moveAndRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const combinedAnimation = () => {
    moveAndRotateAnim.setValue(0);

    Animated.timing(moveAndRotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const pulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const moveX = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const moveY = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const rotate = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColor = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#10b981', '#0ea5e9'],
  });

  const stopAnimation = () => {
    moveAndRotateAnim.setValue(0);
    pulseAnim.setValue(1);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Combined Animation
      </Text>

      <Animated.View
        style={[
          styles.viewBox,
          {
            backgroundColor,
            transform: [
              {translateX: moveX},
              {translateY: moveY},
              {rotate},
              {scale: pulseAnim},
            ],
          },
        ]}></Animated.View>

      <View
        style={{
          gap: 20,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 150,
        }}>
        <Button
          title="Move, Rotate & Change Color"
          onPress={combinedAnimation}
        />
        <Button title="Pulse Animation" onPress={pulseAnimation} />
        <Button title="Stop Animation" onPress={stopAnimation} />
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
    letterSpacing: 2,
  },
  viewBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default CombinedAnimationScreen;
