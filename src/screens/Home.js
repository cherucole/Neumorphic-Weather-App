import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
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
  const dispatch = useDispatch();

  const loadWeather = useCallback(async () => {
    try {
      await dispatch(fetchWeatherHandler());
    } catch (err) {
      Alert.alert(err.message);
    }
  }, [dispatch]);

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

  let icon = !loading && +data.list[0].weather[0].icon.slice(0, 2);

  data.image = path[icon];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.searchRow}>
        <NeuView style={styles.searchContainer}>
          <View style={styles.search}>
            <View style={{ width: '55%' }}>
              <TextInput
                autoCapitalize="words"
                placeholder="Search place..."
                placeholderTextColor="#c5cae9"
                style={styles.input}
                value={city}
                onChangeText={text => setCity(text)}
              />
            </View>
            <TouchableHighlight
              onPress={() => {
                dispatch(fetchWeatherHandler(city));
                setCity('');
              }}
              style={styles.searchButton}>
              <Image
                style={styles.searchIcon}
                source={require('../assets/UI/search2.png')}
              />
            </TouchableHighlight>
          </View>
        </NeuView>
      </View>
      <View style={styles.mainCardContainer}>
        <NeuView style={styles.mainCard}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={{ flex: 1, width: '100%' }}>
              <View style={styles.mainInfo}>
                <Text style={styles.placeName}>{data.list[0].name}</Text>
                <View style={styles.weatherIcon}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={data.image}
                  />
                  <View style={styles.tempContainer}>
                    <Text style={styles.temperature}>
                      {data.list[0].main.temp.toFixed(1)}° C
                    </Text>
                  </View>
                </View>
                <Text style={styles.description}>
                  {titleCase(data.list[0].weather[0].description)}
                </Text>
              </View>
            </View>
          )}
        </NeuView>
      </View>
      <View style={styles.rowCards}>
        <View style={styles.cardContainer}>
          <NeuView style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../assets/UI/wind.png')}
            />
            <Text style={styles.weather}>
              {data.list[0].wind.speed.toFixed(1)} km/h
            </Text>
            <Text style={styles.label}>Wind</Text>
          </NeuView>
        </View>
        <View style={styles.cardContainer}>
          <NeuView style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../assets/UI/humidity.png')}
            />
            <Text style={styles.weather}>{data.list[0].main.humidity} %</Text>
            <Text style={styles.label}>Humidity</Text>
          </NeuView>
        </View>
        <View style={styles.cardContainer}>
          <NeuView style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../assets/UI/pressure.png')}
            />
            <Text style={styles.weather}>{data.list[0].main.pressure} Pa</Text>
            <Text style={styles.label}>Pressure</Text>
          </NeuView>
        </View>
      </View>
      <View>
        <NeuView style={{ borderRadius: 20 }}>
          <View style={styles.forecast}>
            <Text style={[styles.weather, { opacity: 0.8 }]}>See Forecast</Text>
            <Image
              style={styles.arrow}
              source={require('../assets/UI/arrow.png')}
            />
          </View>
        </NeuView>
        <Text style={styles.copyright}>© cherucole 2020</Text>
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
  searchRow: {
    paddingTop: 70,
    alignSelf: 'center',
  },
  searchContainer: {
    height: 55,
    width: 350,
    borderRadius: 30,
    // borderWidth: 0.4,
    // borderColor: '#7986cb',
  },
  search: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  input: {
    height: '100%',
    width: '100%',
    fontSize: 20,
    color: 'white',
  },
  searchIcon: {
    height: 25,
    width: 25,
    tintColor: 'white',
    opacity: 0.7,
  },
  searchButton: {
    height: '100%',
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: 'white',
    borderLeftWidth: 0.5,
  },
  mainCardContainer: {
    paddingTop: 30,
    alignSelf: 'center',
  },
  mainCard: {
    height: 300,
    width: 350,
    borderRadius: 30,
    // borderWidth: 0.4,
    // borderColor: '#7986cb',
  },
  mainInfo: {
    width: '100%',
    paddingVertical: 30,
    paddingLeft: 40,
    justifyContent: 'space-around',
  },
  placeName: {
    fontSize: 35,
    fontWeight: '500',
    color: 'white',
  },
  tempContainer: {
    width: '50%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 42,
    fontWeight: '500',
    color: 'white',
  },
  weatherIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
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
    justifyContent: 'space-around',
  },
  cardImage: {
    height: 45,
    width: 45,
    tintColor: 'white',
    marginTop: 30,
  },
  label: {
    fontSize: 20,
    color: 'white',
    // fontWeight: '500',
    opacity: 0.7,
  },
  weather: {
    fontWeight: '600',
    color: 'white',
    fontSize: 20,
  },
  description: {
    fontSize: 22,
    fontWeight: '500',
    opacity: 0.8,
    color: 'white',
  },
  forecast: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    height: '70%',
    width: 35,
    marginLeft: 20,
    tintColor: 'white',
    opacity: 0.7,
  },
  copyright: {
    alignSelf: 'center',
    fontWeight: '600',
    marginVertical: 25,
    color: 'white',
    opacity: 0.4,
    fontSize: 16,
  },
});
