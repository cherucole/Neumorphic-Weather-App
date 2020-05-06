import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from './types';

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});
export const fetchWeatherSuccess = data => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});
export const fetchWeatherFailure = error => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeatherHandler = location => {
  let url =
    'http://api.openweathermap.org/data/2.5/find?q=London,uk&units=metric&appid=271d1234d3f497eed5b1d80a07b3fcd1';
  return async dispatch => {
    dispatch(fetchWeatherRequest());
    try {
      let response = await fetch(url);
      let results = await response.json();
      dispatch(fetchWeatherSuccess(results));
    } catch (err) {
      dispatch(fetchWeatherFailure(err.message));
    }
  };
};
