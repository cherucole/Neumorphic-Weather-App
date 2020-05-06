import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const Home = props => {
  const results = useSelector(state => state.home);
  const { loading, data, error, number } = results;
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{number}</Text>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
