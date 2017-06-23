import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import ImmutablePropTypes from 'react-immutable-proptypes';

import BaseStyles from '../../lib/baseStyles';
import LectureItem from './LectureItem';
import Section from './Section';

const { View, StyleSheet } = ReactNative;

const styles = StyleSheet.create({
  container: {
    borderColor: BaseStyles.borderColor,
    borderTopWidth: 1,
  },
});

const renderLecture = params => (
  params.lecture.isSection()
    ? <Section key={params.key} lecture={params.lecture} />
    : <LectureItem {...params} />
);

const LectureList = ({
  // values
  containerStyleId,
  courseId,
  isOnline,
  lectureList,
  // actions
  handlePressDelete,
  handlePressDownload,
  handlePressLecture,
}) =>
  (
    <View style={[styles.container, containerStyleId]}>
      {lectureList.map((lecture, i) => renderLecture({
        key: i,
        courseId,
        isOnline,
        lecture,
        handlePressLecture,
        handlePressDownload,
        handlePressDelete,
      }))}
    </View>
  );

LectureList.propTypes = {
  // values
  containerStyleId: PropTypes.number.isRequired,
  courseId: PropTypes.number.isRequired,
  isOnline: PropTypes.bool.isRequired,
  lectureList: ImmutablePropTypes.list.isRequired,
  // actions
  handlePressLecture: PropTypes.func.isRequired,
  handlePressDelete: PropTypes.func.isRequired,
  handlePressDownload: PropTypes.func.isRequired,
};

export default LectureList;
