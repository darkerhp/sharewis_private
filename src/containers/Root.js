/* global __DEV__ */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import I18n from 'react-native-i18n';
import Orientation from 'react-native-orientation';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

import setupI18n from '../config/locales';
import setupMixpanel from '../config/mixpanel';
import PURGE_STORAGE from '../config';
import configureStore from '../store';
import transform from '../transform';
import App from './App';

const store = configureStore();
setupI18n();
setupMixpanel();

export default class Root extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    const persistor = persistStore(
      store,
      {
        storage: AsyncStorage,
        blacklist: ['ui', 'routes', 'form'],
        transforms: [transform],
      },
      () => {
        this.setState({ rehydrated: true });
      },
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
      return <SleekLoadingIndicator loading text={I18n.t('loading')} />;
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
