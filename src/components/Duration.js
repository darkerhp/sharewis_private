import React from 'react';
import ReactNative from 'react-native';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';

const { PropTypes } = React;
const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {},
  estimatedTime: {
    padding: 3,
    fontSize: 8,
    backgroundColor: '#F2F2F2',
    fontWeight: '600',
  },
});

const Duration = ({
  estimatedTime,
  format = 'mm:ss',
  containerStyleId = null,
  durationStyleId = null,
  prefixText = '',
}) =>
  <View style={[styles.container, containerStyleId]}>
    <Text style={[styles.estimatedTime, durationStyleId]}>
      {prefixText}{moment.duration(estimatedTime, 'seconds').format(format, { trim: false })}
    </Text>
  </View>;

Duration.propTypes = {
  estimatedTime: PropTypes.number.isRequired,
  format: PropTypes.string,
  containerStyleId: PropTypes.number,
  durationStyleId: PropTypes.number,
  prefixText: PropTypes.string,
};

export default Duration;
