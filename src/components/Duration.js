import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';

const { Text, View } = ReactNative;

const Duration = ({
  estimatedTime,
  format,
  containerStyle,
  durationStyle,
  prefixText
}) => (
  <View style={containerStyle}>
    {estimatedTime >= 0 && (
      <Text style={durationStyle}>
        {prefixText}
        {moment
          .duration(estimatedTime, 'seconds')
          .format(format, { trim: false })}
      </Text>
    )}
  </View>
);

Duration.propTypes = {
  estimatedTime: PropTypes.number.isRequired,
  format: PropTypes.string,
  containerStyle: PropTypes.any, // eslint-disable-line
  durationStyle: PropTypes.any, // eslint-disable-line
  prefixText: PropTypes.string
};

Duration.defaultProps = {
  format: 'mm:ss',
  containerStyle: {},
  durationStyle: {},
  prefixText: ''
};

export default Duration;
