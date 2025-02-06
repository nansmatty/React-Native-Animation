import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BasicAnimationScreen from './screens/BasicAnimationScreen';
import InterpolationScreen from './screens/InterpolationScreen';
import CombinedAnimationScreen from './screens/CombinedAnimationScreen';
import GestureAnimationScreen from './screens/GestureAnimationScreen';
import CoreConcepts from './screens/CoreConcepts';
import AnimationTypes from './screens/AnimationTypes';
import ReanimatedGestures from './screens/ReanimatedGestures';
import ReanimatedGesturesUpdated from './screens/ReanimatedGesturesUpdated';

export type RootStackParamsList = {
  Home: undefined;
  BasicAnimation: undefined;
  Interpolate: undefined;
  Combined: undefined;
  Gesture: undefined;
  ReanimatedCoreConcepts: undefined;
  ReanimatedAnimationTypes: undefined;
  ReanimatedGestures: undefined;
  ReanimatedGesturesUpdated: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BasicAnimation" component={BasicAnimationScreen} />
      <Stack.Screen name="Interpolate" component={InterpolationScreen} />
      <Stack.Screen name="Combined" component={CombinedAnimationScreen} />
      <Stack.Screen name="Gesture" component={GestureAnimationScreen} />
      <Stack.Screen name="ReanimatedCoreConcepts" component={CoreConcepts} />
      <Stack.Screen
        name="ReanimatedAnimationTypes"
        component={AnimationTypes}
      />
      <Stack.Screen name="ReanimatedGestures" component={ReanimatedGestures} />
      <Stack.Screen
        name="ReanimatedGesturesUpdated"
        component={ReanimatedGesturesUpdated}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default RootNavigator;
