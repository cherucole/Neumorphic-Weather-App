import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherHandler } from '../store/actions/homeActions';

const Home = props => {
  const dispatch = useDispatch();

  const loadWeather = useCallback(async () => {
    try {
      await dispatch(fetchWeatherHandler());
    } catch (err) {
      Alert.alert(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const results = useSelector(state => state.home);
  const { loading, data, error, number } = results;
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{number}</Text>
      <Text>{data.count}</Text>
      <Text>{loading.toString()}</Text>
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
