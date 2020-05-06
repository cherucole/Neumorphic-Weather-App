import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from '../actions/types';
import { placeholder } from '../../data/placeholder';

const initialState = {
  loading: false,
  data: placeholder,
  error: '',
  number: 'ha ha ha',
};

export const homeWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true };

    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
