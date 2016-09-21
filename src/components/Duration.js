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
  containerStyle = null,
  durationStyle = null,
  prefixText = '',
}) =>
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.duration, durationStyle]}>
      {prefixText}{moment.duration(duration, 'seconds').format(format, { trim: false })}
    </Text>
  </View>;

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  format: PropTypes.string,
  /* eslint-disable react/forbid-prop-types */
  containerStyle: PropTypes.object,
  durationStyle: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  prefixText: PropTypes.string,
};

export default Duration;
