import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedFormValidation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailShake = useSharedValue(0);
  const passwordShake = useSharedValue(0);
  const emailCheckmark = useSharedValue(0);
  const passwordCheckmark = useSharedValue(0);
  const emailErrorHeight = useSharedValue(0);
  const passwordErrorHeight = useSharedValue(0);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!text) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(text)) {
      setEmailError('Invalid Email Format.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (text: string) => {
    if (!text) {
      setPasswordError('Password is required');
      return false;
    } else if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);

    const isValidEmail = validateEmail(text);

    emailCheckmark.value = withSpring(isValidEmail ? 1 : 0);

    if (!isValidEmail) {
      emailShake.value = withSequence(
        withTiming(-10, {duration: 50}),
        withTiming(10, {duration: 100}),
        withTiming(0, {duration: 50}),
      );

      emailErrorHeight.value = withSpring(20);
    } else {
      emailErrorHeight.value = withSpring(0);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    const isValidPassword = validatePassword(text);

    passwordCheckmark.value = withSpring(isValidPassword ? 1 : 0);

    if (!isValidPassword) {
      passwordShake.value = withSequence(
        withTiming(-10, {duration: 50}),
        withTiming(10, {duration: 100}),
        withTiming(0, {duration: 50}),
      );

      passwordErrorHeight.value = withSpring(20);
    } else {
      passwordErrorHeight.value = withSpring(0);
    }
  };

  const onSubmit = (email: string, password: string) => {};

  const handleFormSubmit = () => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (isValidEmail && isValidPassword) {
      onSubmit(email, password);
    } else {
      if (!isValidEmail) {
        emailShake.value = withSequence(
          withTiming(-10, {duration: 50}),
          withTiming(10, {duration: 100}),
          withTiming(0, {duration: 50}),
        );

        emailErrorHeight.value = withSpring(20);
      }

      if (!isValidPassword) {
        passwordShake.value = withSequence(
          withTiming(-10, {duration: 50}),
          withTiming(10, {duration: 100}),
          withTiming(0, {duration: 50}),
        );

        passwordErrorHeight.value = withSpring(20);
      }
    }
  };

  const emailAnimationStyle = useAnimatedStyle(() => ({
    transform: [{translateX: emailShake.value}],
  }));

  const passwordAnimationStyle = useAnimatedStyle(() => ({
    transform: [{translateX: passwordShake.value}],
  }));

  const emailCheckmarkAnimationStyle = useAnimatedStyle(() => ({
    opacity: emailCheckmark.value,
    transform: [
      {
        scale: emailCheckmark.value,
      },
      {
        rotate: `${emailCheckmark.value * 360}deg`,
      },
    ],
  }));

  const passwordCheckmarkAnimationStyle = useAnimatedStyle(() => ({
    opacity: passwordCheckmark.value,
    transform: [
      {
        scale: passwordCheckmark.value,
      },
      {
        rotate: `${passwordCheckmark.value * 360}deg`,
      },
    ],
  }));

  const emailErrorAnimationStyle = useAnimatedStyle(() => ({
    height: emailErrorHeight.value,
    opacity: emailErrorHeight.value === 0 ? 0 : 1,
    transform: [{translateY: withSpring(emailErrorHeight.value / 2)}],
  }));

  const passwordErrorAnimationStyle = useAnimatedStyle(() => ({
    height: passwordErrorHeight.value,
    opacity: passwordErrorHeight.value === 0 ? 0 : 1,
    transform: [{translateY: withSpring(passwordErrorHeight.value / 2)}],
  }));

  return (
    <View style={styles.sectionContainer}>
      <Animated.View style={[styles.inputContainer, emailAnimationStyle]}>
        <TextInput
          style={styles.inputComp}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Animated.View style={[styles.checkmark, emailCheckmarkAnimationStyle]}>
          <Text style={[styles.checkmarkText]}></Text>
        </Animated.View>
      </Animated.View>
      <Animated.Text style={[styles.errorText, emailErrorAnimationStyle]}>
        {emailError}
      </Animated.Text>
      <Animated.View style={[styles.inputContainer, passwordAnimationStyle]}>
        <TextInput
          style={styles.inputComp}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Animated.View
          style={[styles.checkmark, passwordCheckmarkAnimationStyle]}>
          <Text style={[styles.checkmarkText]}></Text>
        </Animated.View>
      </Animated.View>
      <Animated.Text style={[styles.errorText, passwordErrorAnimationStyle]}>
        {passwordError}
      </Animated.Text>
      <Pressable style={[styles.submitBtn]} onPress={handleFormSubmit}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    minHeight: '100%',
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  inputComp: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    // marginBottom: 15,
  },

  checkmark: {
    position: 'absolute',
    right: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  submitBtn: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 10,
  },

  checkmarkText: {
    color: '#40ad44',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});

export default ReanimatedFormValidation;
