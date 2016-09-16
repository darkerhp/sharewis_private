/* global __DEV__ */
import React from 'react';
import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import Spinner from 'react-native-loading-spinner-overlay';

import PURGE_STORAGE from '../constants/Debug';
import configureStore from '../store';
import App from './App';

const { Component } = React;
const store = configureStore();


export default class Root extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    const persistor = persistStore(
      store,
      { storage: AsyncStorage },
      () => this.setState({ rehydrated: true }),
    );
    if (__DEV__ && PURGE_STORAGE) {
      LoginManager.logOut();
      persistor.purge();
    }
  }

  render() {
    if (!this.state.rehydrated) {
      return <Spinner visible />;
    }
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
