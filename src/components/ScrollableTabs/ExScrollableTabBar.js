import React from 'react';
import ReactNative from 'react-native';

import { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { Platform } = ReactNative;

export default class ExScrollableTabBar extends ScrollableTabBar {
  componentDidMount() {
    // NOTE AndroidでTopページが初期表示されない不具合に対するHackコード
    // RN 0.48にアップデート後 iosでも発症
    this.props.goToPage(-1);
    setTimeout(() => this.props.goToPage(1), 0);
  }
}
