import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I18n from 'react-native-i18n';
import _ from 'lodash';

import { LECTURE_STATUS_FINISHED } from '../../constants/Api';
import ProgressBar from '../ProgressBar';

const { PropTypes } = React;
const {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  image: {
    flex: 4,
  },
  detailsWrapper: {
    flex: 3,
    marginHorizontal: 10,
  },
  title: {
    flex: 2,
    marginTop: 10,
    fontSize: 13,
    fontWeight: '900',
    color: '#222',
  },
  hr: {
    flex: 1,
    justifyContent: 'center',
  },
  progress: {
    flex: 1,
    fontSize: 12,
    color: '#222',
    marginBottom: 3,
    textDecorationLine: 'underline',
  },
  download: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  downloadText: {
    color: '#7fc8ed',
    fontSize: 11,
    paddingLeft: 3,
  },
});


const CourseSummary = ({ course, lectures, ...props }) => {
  const lectureProgress = _.isEmpty(lectures)
    ? course.lectureProgress
    : _.values(lectures).filter(l => l.status === LECTURE_STATUS_FINISHED).length;

  return (
    <TouchableHighlight {...props}>
      <View style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={{ uri: course.imageUrl }}
        />
        <View style={styles.detailsWrapper}>
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
          <View style={styles.download}>
            <Text style={styles.downloadText}>
              {I18n.t('downloadAvailable')}
            </Text>
            <Icon color={'#7fc8ed'} size={20} name={'cloud-download'} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

CourseSummary.propTypes = {
  course: PropTypes.shape({}),
  lectures: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CourseSummary;
