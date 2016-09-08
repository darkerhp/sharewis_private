/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import BaseStyles from '../baseStyles';
import EmptyList from '../components/Courses/EmptyList';
import { ACT_API_URL } from '../constants/Api';
import redirectTo from '../utils/linking';
import connectToProps from '../utils/reduxUtils';

const { PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    top: 53,
    margin: 13,
    marginBottom: 53,
  },
  contentText: {
    ...BaseStyles.Text,
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 13,
  },
  courseWrapper: {
    flex: 1,
  },
  hyperlinkWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchMore: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingHorizontal: 5,
  },
  hyperlink: {
    color: 'blue',
  },
});

const t = {
  actWebsite: 'ShareWis ACTのサイト',
  searchMore: '更にコースを探す',
};


const CourseList = ({ courses }) => (
  (!courses) ? <EmptyList /> :
    <View style={styles.courseList}>
      <View style={styles.container}>
        <View style={styles.courseWrapper} />
      </View>
      <View style={styles.container}>
        <View style={styles.hyperlinkWrapper}>
          <Hyperlink
            style={styles.searchMore}
            linkStyle={styles.hyperlink}
            linkText={t.searchMore}
            onPress={redirectTo}
          >
            <Text style={styles.contentText}>
              {ACT_API_URL}
            </Text>
          </Hyperlink>
        </View>
      </View>
    </View>
);

CourseList.propTypes = {
  routes: PropTypes.object,
  courses: PropTypes.arrayOf(PropTypes.string),
};


export default connectToProps(CourseList, 'courses');
