import {Animated, Button, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const InterpolationScreen = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const handleStartAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => animation.setValue(0));
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#10b981', '#0ea5e9'],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 100],
  });

  const size = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 250],
  });

  return (
    <ScrollView contentContainerStyle={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Interpolate Screen
      </Text>
      <Animated.View
        style={[
          styles.viewBox,
          {
            backgroundColor,
            borderRadius,
            transform: [{rotate}],
          },
        ]}>
        <Text
          style={[
            styles.sectionTitle,
            {fontSize: 16, marginVertical: 20, color: '#111827'},
          ]}>
          Interpolate Me!
        </Text>
      </Animated.View>
      <Button title="Start Animation Here" onPress={handleStartAnimation} />
    </ScrollView>
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
    width: 150,
    height: 150,
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

export default InterpolationScreen;
