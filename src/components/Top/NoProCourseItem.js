import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import alertOfflineError from '../../utils/alert';
import redirectTo from '../../utils/linking';
import BaseStyles from '../../lib/baseStyles';
import OneColumnItemBox from '../CourseList/OneColumnItemBox';
import { ACT_PRO_COURSES_URL } from '../../lib/constants';

const { Platform, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  myCourseSummaryItemBox: {
    height: 150,
    paddingHorizontal: 15,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
});

/**
 * リンククリックハンドラ
 * @param isOnline
 * @param url
 */
const handlePress = (isOnline, url) => {
  if (!isOnline) {
    alertOfflineError();
    return;
  }
  redirectTo(url);
};

const NoProCourseItem = ({ isOnline }) =>
  (
    <OneColumnItemBox style={styles.myCourseSummaryItemBox} isTouchble={false}>
      <Hyperlink
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        linkStyle={{ color: BaseStyles.hyperlink }}
        linkText={url => (url === ACT_PRO_COURSES_URL ? I18n.t('actWebsite') : url)}
        onPress={url => handlePress(isOnline, url)}
      >
        <Text style={styles.contentText}>
          {Platform.OS === 'ios' ? I18n.t('notPurchasedProCourseYet') : I18n.t('noProCourses')}
        </Text>
      </Hyperlink>
    </OneColumnItemBox>
  );

NoProCourseItem.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default NoProCourseItem;
