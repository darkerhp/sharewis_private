import React from 'react';
import ReactNative from 'react-native';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'; // eslint-disable-line

const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {},
  duration: {
    padding: 3,
    fontSize: 8,
    backgroundColor: '#F2F2F2',
    fontWeight: '600',
  },
});

const Duration = ({
  duration,
  format = 'mm:ss',
  containerStyleId = null,
  durationStyleId = null,
  prefixText = '',
}) =>
  <View style={[styles.container, containerStyleId]}>
    <Text style={[styles.duration, durationStyleId]}>
      {prefixText}{moment.duration(duration, 'seconds').format(format, { trim: false })}
    </Text>
  </View>;

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  format: PropTypes.string,
  containerStyleId: PropTypes.number,
  durationStyleId: PropTypes.number,
  prefixText: PropTypes.string,
};

export default Duration;
