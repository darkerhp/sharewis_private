import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import Hyperlink from 'react-native-hyperlink';

import redirectTo from '../utils/linking';
import BaseStyles from '../baseStyles';
import { ACT_API_URL } from '../constants/Api';

const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    ...BaseStyles.Text,
    textAlignVertical: 'center',
  },
  emptyList: {
    margin: 30,
  },
});

const t = {
  actWebsite: 'ShareWis ACTのサイト',
  noCourses: `購入・みのコースがない方は、 ${ACT_API_URL} よりお手・きを進めてください`,
};


const CourseList = () =>
  <View style={styles.courseList}>
    <Hyperlink
      style={styles.emptyList}
      linkStyle={{ color: BaseStyles.hyperlink }}
      linkText={url => (url === ACT_API_URL ? t.actWebsite : url)}
      onPress={redirectTo}
    >
      <Text style={styles.contentText}>
        {t.noCourses}
      </Text>
    </Hyperlink>
  </View>;

CourseList.propTypes = {
  routes: PropTypes.object,
};


export default connect(
  ({ routes }) => ({ routes })
)(CourseList);
