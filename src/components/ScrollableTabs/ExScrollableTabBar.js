import React from 'react';

import { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class ExScrollableTabBar extends DefaultTabBar {
  componentDidMount() {
    // NOTE AndroidでTopページが初期表示されない不具合に対するHackコード
    this.props.goToPage(-1);
    setTimeout(() => this.props.goToPage(1), 0);
  }
}
