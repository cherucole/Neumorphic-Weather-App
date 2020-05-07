import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherHandler } from '../store/actions/homeActions';

import { NeuView } from 'neumorphism-ui';
const titleCase = str => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
};

const Home = props => {
  const [city, setCity] = useState('');
  // const dispatch = useDispatch();

  // const loadWeather = useCallback(async () => {
  //   try {
  //     await dispatch(fetchWeatherHandler());
  //   } catch (err) {
  //     Alert.alert(err.message);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   loadWeather();
  // }, [loadWeather]);

  const results = useSelector(state => state.home);
  const { loading, data, error, number } = results;

  let path = {
    1: require('../assets/icons/01d.png'),
    2: require('../assets/icons/02d.png'),
    3: require('../assets/icons/03d.png'),
    4: require('../assets/icons/04d.png'),
    9: require('../assets/icons/09d.png'),
    10: require('../assets/icons/10d.png'),
    11: require('../assets/icons/11d.png'),
    13: require('../assets/icons/13d.png'),
    50: require('../assets/icons/50d.png'),
  };
  let icon = +data.list[0].weather[0].icon.slice(0, 2);

  data.image = path[icon];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          paddingTop: 70,
          alignSelf: 'center',
          // marginVertical: 20,
        }}>
        <NeuView
          style={{
            height: 55,
            width: 350,
            borderRadius: 30,
            // borderWidth: 0.4,
            // borderColor: '#7986cb',
          }}>
          <TextInput
            autoCapitalize="words"
            placeholder="Search city..."
            placeholderTextColor="#c5cae9"
            style={styles.input}
            value={city}
            onChangeText={text => setCity(text)}
          />
          {/* <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 19,
              opacity: 0.7,
            }}>
            Search city...
          </Text> */}
        </NeuView>
      </View>
      <View
        style={{
          paddingTop: 30,
          alignSelf: 'center',
        }}>
        <NeuView
          style={{
            height: 300,
            width: 350,
            borderRadius: 30,
            // borderWidth: 0.4,
            // borderColor: '#7986cb',
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                width: '50%',
                paddingVertical: 30,
                paddingLeft: 40,
                justifyContent: 'space-around',
                // backgroundColor:'red'
              }}>
              <Text style={{ fontSize: 35, fontWeight: '500', color: 'white' }}>
                {data.list[0].name}
              </Text>
              <Image style={{ width: 100, height: 100 }} source={data.image} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  opacity: 0.8,
                  color: 'white',
                }}>
                {titleCase(data.list[0].weather[0].description)}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                paddingVertical: 30,
                paddingleft: 30,
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 32, fontWeight: '500', color: 'white' }}>
                {data.list[0].main.temp.toFixed(1)}° C
              </Text>

              <View style={styles.tempContainer}>
                <Text style={styles.maxTemp}>
                  {data.list[0].main.temp_max.toFixed(1)}°/
                  {data.list[0].main.temp_min.toFixed(1)}°
                </Text>
              </View>
              <Text style={{ fontSize: 28, fontWeight: '500', color: 'white' }}>
                {data.list[0].wind.speed.toFixed(1)} km/h
              </Text>
            </View>
          </View>
        </NeuView>
      </View>
      <View style={styles.rowCards}>
        <View style={styles.cardContainer}>
          <NeuView style={styles.card}>
            <Text>{data.list[0].wind.speed.toFixed(1)} km/h</Text>
            <Text>Wind</Text>
          </NeuView>
        </View>
        <View style={styles.cardContainer}>
          <NeuView style={styles.card}>
            <Text>{data.list[0].main.humidity} %</Text>
            <Text>Humidity</Text>
          </NeuView>
        </View>
        <View style={styles.cardContainer}>
          <NeuView style={styles.card}>
            <Text>{data.list[0].main.pressure} Pa</Text>
            <Text>Pressure</Text>
          </NeuView>
        </View>
      </View>
      <View>
        <Text>See Forecast</Text>
        <Text>© cherucole 2020</Text>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#3f51b5',
  },
  tempContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  tempArrow: {
    height: 18,
    width: 18,
    tintColor: 'white',
    opacity: 0.5,
  },
  maxTemp: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    opacity: 0.6,
    // marginLeft: 40,
    marginVertical: 3,
  },
  input: {
    height: '100%',
    width: '60%',
    fontSize: 20,
    color: 'white',
  },
  rowCards: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardContainer: {
    height: 220,
    width: '32%',
  },
  card: {
    height: 220,
    width: '100%',
    borderRadius: 10,
    // borderWidth: 0.4,
    // borderColor: '#7986cb',
  },
});
