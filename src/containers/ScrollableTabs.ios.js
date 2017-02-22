import React, { Component, PropTypes } from 'react';
import { StatusBar } from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';

import BaseStyles from '../baseStyles';
import SnackCourse from './SnackCourse';
import ExScrollableTabBar from '../components/ScrollableTabs/ExScrollableTabBar';

// TODO プロコースが増えた場合、DefaultTabBar > ScrollableTabBarで実装する。
// デザイン妥協できない場合、CustomでScrollableTabBarを実装する必要がありそう。
const renderScrollableTabBar = () =>
  <ExScrollableTabBar
    underlineStyle={{ backgroundColor: '#ffff77', height: 3 }}
    activeTextColor="#ffffff"
    inactiveTextColor="#ffffff"
    backgroundColor={BaseStyles.navBarBackgroundColor}
  />;

@connect(({ user, routes }) => ({ user, routes }))
class ScrollableTabs extends Component { // eslint-disable-line
  static propTypes = {
    moveTo: PropTypes.string,
    user: PropTypes.shape({}).isRequired,
  };

  render() {
    StatusBar.setBarStyle('light-content');
    return (
      <ScrollableTabView
        style={{ marginTop: BaseStyles.navbarHeight - 1 }}
        initialPage={0} // 0が開始位置
        renderTabBar={() => renderScrollableTabBar()}
      >
        <SnackCourse tabLabel={I18n.t('snackCourse')} />
      </ScrollableTabView>
    );
  }
}

export default ScrollableTabs;
