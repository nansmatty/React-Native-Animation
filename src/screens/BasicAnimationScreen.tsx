import {
  Animated,
  Button,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';

const BasicAnimationScreen = () => {
  const fadeAni = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.75)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const springAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const handleFadeIn = () => {
    Animated.timing(fadeAni, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleFadeOut = () => {
    Animated.timing(fadeAni, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleTranslate = () => {
    Animated.timing(translateAnim, {
      toValue: 100,
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
  };

  const handleScaleIn = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.75,
        delay: 1000,
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRotate = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSpring = () => {
    Animated.spring(springAnim, {
      toValue: 100,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      springAnim.setValue(0);
    });
  };

  const handleBounce = () => {
    Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: -20,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.sectionContainer}>
      {/* Fade Animation Demo */}

      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Fade In & Out Animation
      </Text>

      <View style={styles.fadeAniContainer}>
        <Animated.View
          style={[
            styles.viewBox,
            styles.fadeBox,
            {opacity: fadeAni},
          ]}></Animated.View>
        <View style={styles.btnContainer}>
          <Button title="Fade In" onPress={handleFadeIn} />
          <Button title="Fade Out" onPress={handleFadeOut} />
        </View>
      </View>

      {/* Translate Animation Demo */}

      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Translate Animation
      </Text>

      <View style={styles.fadeAniContainer}>
        <Animated.View
          style={[
            styles.viewBox,
            styles.translateBox,
            {
              transform: [{translateX: translateAnim}],
            },
          ]}></Animated.View>
        <Button title="Translate" onPress={handleTranslate} />
      </View>

      {/* Scale Animation Demo */}

      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Scale In & Out Animation
      </Text>

      <View style={styles.fadeAniContainer}>
        <Animated.View
          style={[
            styles.viewBox,
            styles.scaleBox,
            {
              transform: [
                {
                  scale: scaleAnim,
                },
              ],
            },
          ]}></Animated.View>
        <Button title="Scale Animation" onPress={handleScaleIn} />
      </View>

      {/* Rotate Animation Demo */}

      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Rotate Animation
      </Text>

      <View style={styles.fadeAniContainer}>
        <Animated.View
          style={[
            styles.viewBox,
            styles.rotateBox,
            {
              transform: [
                {
                  rotate: spin,
                },
              ],
            },
          ]}></Animated.View>
        <Button title="Rotate Animation" onPress={handleRotate} />
      </View>

      {/* Spring Animation Demo */}

      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Spring Animation
      </Text>

      <View style={styles.fadeAniContainer}>
        <Animated.View
          style={[
            styles.viewBox,
            styles.springBox,
            {
              transform: [
                {
                  translateX: springAnim,
                },
              ],
            },
          ]}></Animated.View>
        <Button title="Spring Animation" onPress={handleSpring} />
      </View>

      {/* Bounce Animation Demo */}

      <Text
        style={[
          styles.sectionTitle,
          {fontSize: 18, marginVertical: 20, color: '#111827'},
        ]}>
        Bounce Animation
      </Text>

      <View style={styles.fadeAniContainer}>
        <Animated.View
          style={[
            styles.viewBox,
            styles.bounceBox,
            {
              transform: [
                {
                  translateY: bounceAnim,
                },
              ],
            },
          ]}></Animated.View>
        <Button title="Bounce Animation" onPress={handleBounce} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 10,
    minHeight: '100%',
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  fadeAniContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
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

  btnContainer: {
    gap: 10,
    flexDirection: 'row',
  },

  fadeBox: {
    backgroundColor: '#3498db',
  },

  translateBox: {
    backgroundColor: '#65a30d',
  },

  scaleBox: {
    backgroundColor: '#dc2626',
  },
  rotateBox: {
    backgroundColor: '#a21caf',
  },
  springBox: {
    backgroundColor: '#f43f5e',
  },
  bounceBox: {
    backgroundColor: '#fad01e',
  },
});

export default BasicAnimationScreen;
