import React from 'react';
import ReactNative from 'react-native';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
import BaseStyles from '../baseStyles';

const { PropTypes } = React;
const { Text, View } = ReactNative;


const Duration = ({
  estimatedTime,
  format = 'mm:ss',
  containerStyleId = null,
  durationStyleId = null,
  prefixText = '',
}) =>
  <View style={containerStyleId}>
    <Text style={durationStyleId}>
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
