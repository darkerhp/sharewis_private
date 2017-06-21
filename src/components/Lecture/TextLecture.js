import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import Lecture from '../../modules/models/Lecture';
import BaseStyles from '../../lib/baseStyles';

const {
  StyleSheet,
  Text,
  View,
  WebView,
} = ReactNative;

const styles = StyleSheet.create({
  webViewWrapper: { flex: 9 },
  webView: {},
  lectureTitleTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lectureTitle: {
    fontSize: 17,
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
});

const TextLecture = ({ currentLecture, lectureContentStyleId }) =>
  (
    <View style={[lectureContentStyleId, { marginTop: BaseStyles.navbarHeight }]}>
      <View style={styles.lectureTitleTextWrapper}>
        <Text style={styles.lectureTitle}>{currentLecture.title}</Text>
      </View>
      <View style={styles.webViewWrapper}>
        <WebView
          style={styles.webView}
          source={{ html: currentLecture.body }}
        />
      </View>
    </View>
  );

TextLecture.propTypes = {
  currentLecture: PropTypes.instanceOf(Lecture).isRequired,
  lectureContentStyleId: PropTypes.number.isRequired,
};

export default TextLecture;
