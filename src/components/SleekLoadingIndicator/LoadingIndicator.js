import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

const {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginTop: 4,
  },
});

const LoadingIndicator = ({ text }) => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>{text}</Text>
    <View style={styles.spinnerContainer}>
      <ActivityIndicator
        animating
        size="large"
        color="#fff"
      />
    </View>
  </View>
);

LoadingIndicator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LoadingIndicator;
