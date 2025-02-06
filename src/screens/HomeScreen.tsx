import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../RootNavigator';

type HomeScreenParamsList = StackNavigationProp<RootStackParamsList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenParamsList;
};

const topics = [
  {
    id: 1,
    title: 'Basic Animation',
    screen: 'BasicAnimation',
  },
  {
    id: 2,
    title: 'Interpolate Animation',
    screen: 'Interpolate',
  },
  {
    id: 3,
    title: 'Combined Animation',
    screen: 'Combined',
  },
  {
    id: 4,
    title: 'Gesture Animation',
    screen: 'Gesture',
  },
  {
    id: 5,
    title: 'Reanimated Core Concepts',
    screen: 'ReanimatedCoreConcepts',
  },
  {
    id: 6,
    title: 'Reanimated Animation Types',
    screen: 'ReanimatedAnimationTypes',
  },
  {
    id: 7,
    title: 'Reanimated Gestures',
    screen: 'ReanimatedGestures',
  },
  {
    id: 8,
    title: 'Reanimated Gestures Updated API',
    screen: 'ReanimatedGesturesUpdated',
  },
  {
    id: 9,
    title: 'Reanimated Form Validation',
    screen: 'ReanimatedFormValidation',
  },
];

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View style={styles.sectionContainer}>
      <FlatList
        data={topics}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() =>
              navigation.navigate(item.screen as keyof RootStackParamsList)
            }>
            <Text style={styles.touchableText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#1e40af',
    height: '100%',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#111827',
  },

  touchable: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 5,
    shadowOpacity: 0.5,
  },

  touchableText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
