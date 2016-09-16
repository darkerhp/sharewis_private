import React from 'react';
import ReactNative from 'react-native';
import Hr from 'react-native-hr';

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
  },
  title: {
    flex: 2,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    color: '#222',
  },
  hr: {
    flex: 1,
    justifyContent: 'center',
  },
  progress: {
    flex: 2,
    fontSize: 12,
    marginLeft: 10,
    color: '#222',
  },
  CourseSummary: {
    flex: 1,
    margin: 30,
  },
});


const t = {
  progressText: (progress, total) =>
    `${progress}/${total}のレクチャーが完了しました`,
};


const CourseSummary = ({ course, ...props }) =>
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
          {t.progressText(course.nb_lectures_watched, course.total_nb_lectures)}
        </Text>
        <ProgressBar progress={course.total_nb_lectures / course.nb_lectures_watched} />
      </View>
    </View>
  </TouchableHighlight>;

CourseSummary.propTypes = {
  course: PropTypes.shape({
    /* eslint-disable react/no-unused-prop-types */
    title: PropTypes.string.required,
    imageUrl: PropTypes.string.required,
    lectures: PropTypes.array.required,
    /* eslint-enable react/no-unused-prop-types */
  }),
};

export default CourseSummary;
