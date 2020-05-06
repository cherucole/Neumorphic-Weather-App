import React, { useEffect } from 'react';
import HomePage from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const App = props => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
