import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import BaseStyles from '../../lib/baseStyles';

const {
  StyleSheet,
  TouchableOpacity,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: BaseStyles.deviceHeight / 2,
    borderWidth: 1,
    borderColor: BaseStyles.borderColor,
    borderRadius: 9,
    backgroundColor: 'white',
    marginBottom: 13,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
});

const OneColumnItemBox = ({ style, isTouchble, ...props }) => {
  if (isTouchble) {
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        {...props}
      />
    );
  }

  return (
    <View
      style={[styles.container, style]}
      {...props}
    />
  );
};

OneColumnItemBox.propTypes = {
  style: PropTypes.any.isRequired, // eslint-disable-line
  isTouchble: PropTypes.bool.isRequired,
};

OneColumnItemBox.defaultProps = {
  isTouchble: true,
};

export default OneColumnItemBox;
