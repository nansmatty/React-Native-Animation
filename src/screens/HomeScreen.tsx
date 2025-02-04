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
    backgroundColor: '#facc15',
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
    backgroundColor: '#ca8a04',
    marginBottom: 15,
    borderRadius: 10,
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
