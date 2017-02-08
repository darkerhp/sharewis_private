import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import BaseStyles from '../../baseStyles';
import OneColumnItemBox from '../CourseList/OneColumnItemBox';
import { ACT_PRO_COURSES_URL } from '../../constants/Api';

const { StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  myCourseSummaryItemBox: {
    height: 150,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
});

const NoProCourseItem = ({ isOnline }) =>
  <OneColumnItemBox style={styles.myCourseSummaryItemBox} isTouchble={false}>
    <Hyperlink
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      linkStyle={{ color: BaseStyles.hyperlink }}
      linkText={url => (url === ACT_PRO_COURSES_URL ? I18n.t('actWebsite') : url)}
      onPress={() => console.log('onPress')}
    >
      <Text style={styles.contentText}>
        {I18n.t('noProCourses')}
      </Text>
    </Hyperlink>
  </OneColumnItemBox>;

NoProCourseItem.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default NoProCourseItem;
