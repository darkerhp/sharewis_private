import React from 'react';
import { Text } from 'react-native';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import BaseStyles from '../baseStyles';
import CourseList from '../containers/CourseList';


const ScrollableTabs = () =>
  <ScrollableTabView
    style={{marginTop: BaseStyles.navbarHeight, }}
    initialPage={1} // 0が開始位置
    renderTabBar={() => <ScrollableTabBar />}
  >
    <CourseList tabLabel='マイコース' />
    <Text tabLabel='Top'>Top</Text>
    <Text tabLabel='スナックコース'>スナックコース</Text>
  </ScrollableTabView>;

export default ScrollableTabs;
