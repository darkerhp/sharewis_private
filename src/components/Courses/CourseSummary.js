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
    marginHorizontal: 10,
  },
  title: {
    flex: 2,
    marginTop: 10,
    fontSize: 13,
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
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  downloadText: {
    fontSize: 12,
    color: '#7fc8ed',
  },
});


const t = {
  progressText: (progress, total) =>
    `${progress}/${total}のレクチャーが完了しました`,
  downloadAvailable: 'ダウンロード消みレクチャーあり',
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
        <ProgressBar progress={course.nb_lectures_watched / course.total_nb_lectures} />
        <View style={styles.download}>
          <Text style={styles.downloadText}>
            {t.downloadAvailable}
          </Text>
        </View>
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
