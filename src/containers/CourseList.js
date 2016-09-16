/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../baseStyles';
import CourseSummary from '../components/Courses/CourseSummary';
import EmptyList from '../components/Courses/EmptyList';
import { ACT_API_URL } from '../constants/Api';
import redirectTo from '../utils/linking';
import connectToProps from '../utils/redux';

const { Component, PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    top: 53,
    margin: 13,
    marginBottom: 53,
  },
  courseWrapper: {
    flex: 1,
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


// eslint-disable-next-line react/prefer-stateless-function
class CourseList extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
      /* eslint-disable react/no-unused-prop-types */
      title: PropTypes.string.required,
      lectures: PropTypes.array.required,
      /* eslint-enable react/no-unused-prop-types */
    })),
  };

  render() {
    const { courses } = this.props;

    if (!courses) {
      return <EmptyList />;
    }
    return (
      <View style={styles.courseList}>
        <View style={styles.container}>
          {courses.map((course, key) =>
            <CourseSummary
              style={styles.courseWrapper}
              onPress={() =>
                RouterActions.courseDetails({ course })
              }
              course={course}
              key={key}
            />
          )}
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
  }
}


export default connectToProps(CourseList, 'courses');
