import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import BaseStyles from '../../lib/baseStyles';

const { StyleSheet, TouchableOpacity, View } = ReactNative;

const itemWidth = (BaseStyles.deviceWidth - 30) / 2;
const itemHeight = itemWidth / 3 * 4; // 4:3

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    width: itemWidth,
    height: itemHeight,
    borderRadius: 9,
    overflow: 'hidden'
  }
});

const TwoColumnItemBox = ({ style, isTouchble, ...props }) => {
  if (isTouchble) {
    return <TouchableOpacity style={[styles.container, style]} {...props} />;
  }

  return <View style={[styles.container, style]} {...props} />;
};

TwoColumnItemBox.propTypes = {
  style: PropTypes.any, // eslint-disable-line
  isTouchble: PropTypes.bool.isRequired
};

TwoColumnItemBox.defaultProps = {
  isTouchble: true
};

export default TwoColumnItemBox;
