import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Course from '../../models/Course';
import OneColumnItemBox from './OneColumnItemBox';
import ProgressBar from '../ProgressBar';

const {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 5,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  detailsWrapper: {
    flex: 3,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  detailsWrapperHasDownloaded: {
    paddingBottom: 0,
    paddingTop: 10,
  },
  disabledCourse: {
    ...Platform.select({
      android: {
        opacity: 0.2,
      },
      ios: {
        opacity: 0.4,
      },
    }),
  },
  title: {
    fontWeight: '900',
    color: '#222',
    fontSize: 13,
  },
  hr: {
    justifyContent: 'center',
  },
  progress: {
    fontSize: 12,
    color: '#222',
    marginBottom: 3,
    textDecorationLine: 'underline',
  },
  download: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  downloadText: {
    color: '#7fc8ed',
    fontSize: 11,
    paddingLeft: 3,
  },
});


const CourseSummary = ({
  course,
  lectures,
  isDisabledCourse,
  onPressCourse,
  style,
}) => {
  const lectureProgress = lectures.isEmpty()
    ? course.lectureProgress
    : lectures.filter(l => l.isFinished()).size;
  return (
    <OneColumnItemBox
      style={[styles.container, style]}
      onPress={() => onPressCourse(course)}
      disabled={isDisabledCourse}
    >
      <View style={[{ flex: 1 }, isDisabledCourse && styles.disabledCourse]}>
        <Image
          style={styles.image}
          source={{ uri: course.imageUrl }}
        />
        <View
          style={[
            styles.detailsWrapper,
            course.hasDownloadedLecture && styles.detailsWrapperHasDownloaded,
          ]}
        >
          <Text style={styles.title}>
            {course.title}
          </Text>
          <View style={styles.hr}>
            <Hr lineColor={'#dadada'} />
          </View>
          <Text style={styles.progress}>
            {`${lectureProgress}/${course.lectureCount} ${I18n.t('progressText')}`}
          </Text>
          <ProgressBar progress={lectureProgress / course.lectureCount} />
          {course.hasDownloadedLecture &&
          <View style={styles.download}>
            <Text style={styles.downloadText}>
              {I18n.t('downloadAvailable')}
            </Text>
            <Icon color={'#7fc8ed'} size={20} name={'cloud-download'} />
          </View>
          }
        </View>
      </View>
    </OneColumnItemBox>
  );
};

CourseSummary.propTypes = {
  course: PropTypes.instanceOf(Course),
  lectures: ImmutablePropTypes.orderedMap,
  isDisabledCourse: PropTypes.bool.isRequired,
  onPressCourse: PropTypes.func.isRequired,
  style: PropTypes.any, // eslint-disable-line
};

export default CourseSummary;
