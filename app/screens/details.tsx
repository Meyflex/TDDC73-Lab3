import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';


type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsRouteProp;
};

const Details: React.FC<Props> = ({ route }) => {
  const { repository } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text>Forks: {repository.forks_count}</Text>
      <Text>Stars: {repository.stargazers_count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Additional styles here
});

export default Details;
