import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';

import ScrollableTabView, {
  DefaultTabBar
} from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';

import BaseStyles from '../lib/baseStyles';
import MyCourse from './MyCourse';
import SnackCourse from './SnackCourse';
import ProCourses from './ProCourses';
import Top from './Top';
import ExScrollableTabBar from '../components/ScrollableTabs/ExScrollableTabBar';

// TODO プロコースが増えた場合、DefaultTabBar > ScrollableTabBarで実装する。
// デザイン妥協できない場合、CustomでScrollableTabBarを実装する必要がありそう。
const renderScrollableTabBar = () => (
  <ExScrollableTabBar
    underlineStyle={{ height: 0 }} // アクティブタグのアンダーラインを表示しない
    activeTextColor="#ffffff"
    inactiveTextColor="#ffffff"
    backgroundColor={BaseStyles.navBarBackgroundColor}
  />
);

@connect(({ user, routes }) => ({ user, routes }))
class ScrollableTabs extends Component { // eslint-disable-line
  render() {
    StatusBar.setBarStyle('light-content');
    return (
      <ScrollableTabView
        style={{ marginTop: BaseStyles.navbarHeight - 1 }}
        initialPage={1} // 0が開始位置
        renderTabBar={() => renderScrollableTabBar()}
      >
        <MyCourse tabLabel={I18n.t('myCourse')} />
        <Top tabLabel={I18n.t('top')} />
        <SnackCourse tabLabel={I18n.t('snackCourse')} />
        {Platform.OS === 'ios' && <ProCourses tabLabel={I18n.t('proCourse')} />}
      </ScrollableTabView>
    );
  }
}

export default ScrollableTabs;
