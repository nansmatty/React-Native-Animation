import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BasicAnimationScreen from './screens/BasicAnimationScreen';

export type RootStackParamsList = {
  Home: undefined;
  BasicAnimation: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BasicAnimation" component={BasicAnimationScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default RootNavigator;
