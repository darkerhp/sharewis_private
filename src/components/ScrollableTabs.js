import React from 'react';
import { StatusBar, Text } from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import BaseStyles from '../baseStyles';
import CourseList from '../containers/CourseList';

// TODO プロコースが増えた場合、DefaultTabBar > ScrollableTabBarで実装する。
// デザイン妥協できない場合、CustomでScrollableTabBarを実装する必要がありそう。
const renderScrollableTabBar = () =>
  <DefaultTabBar
    underlineStyle={{ backgroundColor: '#ffff77', height: 2 }}
    activeTextColor="#ffffff"
    inactiveTextColor="#ffffff"
    backgroundColor={BaseStyles.navBarBackgroundColor}
  />;

const ScrollableTabs = () => {
  StatusBar.setBarStyle('light-content');

  return (
    <ScrollableTabView
      style={{ marginTop: BaseStyles.navbarHeight - 1 }}
      initialPage={1} // 0が開始位置
      renderTabBar={() => renderScrollableTabBar()}
    >
      <CourseList tabLabel="マイコース" />
      <Text tabLabel="Top">Top</Text>
      <Text tabLabel="スナックコース">スナックコース</Text>
    </ScrollableTabView>
  );
};

export default ScrollableTabs;
