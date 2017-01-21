import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

const {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} = ReactNative;

const displayWidth = Dimensions.get('window').width;
const itemWidth = (displayWidth - 30) / 2;
const itemHeight = (itemWidth / 3) * 4; // 4:3

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    width: itemWidth,
    height: itemHeight,
    borderRadius: 9,
    overflow: 'hidden',
  },
});

const TwoColumnItemBox = ({ style, isTouchble, ...props }) => {
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


TwoColumnItemBox.propTypes = {
  style: PropTypes.any, // eslint-disable-line
  isTouchble: PropTypes.bool.isRequired,
};

TwoColumnItemBox.defaultProps = {
  isTouchble: true,
};


export default TwoColumnItemBox;
