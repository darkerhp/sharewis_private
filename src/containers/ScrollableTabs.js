import React, { Component, PropTypes } from 'react';
import { Platform, StatusBar, Text } from 'react-native';

import autobind from 'autobind-decorator';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';

import BaseStyles from '../baseStyles';
import MyCourse from './MyCourse';
import SnackCourse from './SnackCourse';
import Top from './Top';
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
class ScrollableTabs extends Component {
  static propTypes = {
    moveTo: PropTypes.string,
    user: PropTypes.shape({}).isRequired,
  };

  static MY_COURSE = 'myCourse';
  static SNACK_COURSE = 'snackCourse';

  /**
   * ページ番号を取得する
   * @returns {number}
   */
  @autobind
  getPageNo() {
    const { moveTo } = this.props;

    switch (moveTo) {
      case ScrollableTabs.SNACK_COURSE:
        return this.isHideMyCourse() ? 1 : 2;
      case ScrollableTabs.MY_COURSE:
        return 0;
      default: // Top
        return this.isHideMyCourse() ? 0 : 1;
    }
  }

  @autobind
  isHideMyCourse() {
    const { user } = this.props;
    return !user.loggedIn && Platform.OS === 'ios';
  }

  render() {
    StatusBar.setBarStyle('light-content');
    const { moveTo, user } = this.props;

    return (
      <ScrollableTabView
        style={{ marginTop: BaseStyles.navbarHeight - 1 }}
        initialPage={this.getPageNo()} // 0が開始位置
        renderTabBar={() => renderScrollableTabBar()}
      >
        {/* iOSの場合は、ゲストユーザーにマイコースのカラムを表示しない */}
        {!this.isHideMyCourse() && <MyCourse tabLabel={I18n.t('myCourse')} />}
        <Top tabLabel={I18n.t('top')} />
        <SnackCourse tabLabel={I18n.t('snackCourse')} />
      </ScrollableTabView>
    );
  }
}

export default ScrollableTabs;
