import React from 'react';
import ReactNative from 'react-native';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const styles = StyleSheet.create({
  container: {},

});

const Section = (title) => (
  <View style={styles.section}>{title}</View>
);


Section.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default Section;
