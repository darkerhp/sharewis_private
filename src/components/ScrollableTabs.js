import React, { PropTypes } from 'react';
import { StatusBar, Text } from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';

import BaseStyles from '../baseStyles';
import MyCourse from '../containers/MyCourse';
import SnackCourse from '../containers/SnackCourse';

// TODO プロコースが増えた場合、DefaultTabBar > ScrollableTabBarで実装する。
// デザイン妥協できない場合、CustomでScrollableTabBarを実装する必要がありそう。
const renderScrollableTabBar = () =>
  <DefaultTabBar
    underlineStyle={{ backgroundColor: '#ffff77', height: 3 }}
    activeTextColor="#ffffff"
    inactiveTextColor="#ffffff"
    backgroundColor={BaseStyles.navBarBackgroundColor}
  />;

const ScrollableTabs = ({ initialPage }) => {
  StatusBar.setBarStyle('light-content');

  return (
    <ScrollableTabView
      style={{ marginTop: BaseStyles.navbarHeight - 1 }}
      initialPage={initialPage !== undefined ? initialPage : 1} // 0が開始位置
      renderTabBar={() => renderScrollableTabBar()}
    >
      <MyCourse tabLabel={I18n.t('myCourse')} />
      <Text tabLabel="Top">Top</Text>
      <SnackCourse tabLabel={I18n.t('snackCourse')} />
    </ScrollableTabView>
  );
};

ScrollableTabs.propTypes = {
  initialPage: PropTypes.number,
};

export default ScrollableTabs;
