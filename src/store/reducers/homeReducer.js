import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: '',
  number: 'ha ha ha',
};

export const homeWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {...state, loading: true};

    case FETCH_WEATHER_SUCCESS:
      return {...state, loading: false, data: action.payload};

    case FETCH_WEATHER_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
