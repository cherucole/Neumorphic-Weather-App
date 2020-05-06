import thunk from 'redux-thunk';
import { homeWeatherReducer } from './reducers/homeReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  home: homeWeatherReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
