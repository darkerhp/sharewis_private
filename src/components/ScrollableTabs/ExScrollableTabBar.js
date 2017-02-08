import React from 'react';
import ReactNative from 'react-native';

import { DefaultTabBar } from 'react-native-scrollable-tab-view';

const { Platform } = ReactNative;

export default class ExScrollableTabBar extends DefaultTabBar {
  componentDidMount() {
    // NOTE AndroidでTopページが初期表示されない不具合に対するHackコード
    if (Platform.OS === 'android') {
      this.props.goToPage(-1);
      setTimeout(() => this.props.goToPage(1), 0);
    }
  }
}
