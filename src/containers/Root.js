/* global __DEV__ */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import Orientation from 'react-native-orientation';
import Spinner from 'react-native-loading-spinner-overlay';

import setupI18n from '../utils/translations';
import PURGE_STORAGE from '../constants/Debug';
import configureStore from '../store';
import App from './App';

const store = configureStore();
setupI18n();


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

  componentDidMount() {
    Orientation.lockToPortrait();
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
