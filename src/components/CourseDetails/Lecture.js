import React from 'react';
import ReactNative from 'react-native';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const styles = StyleSheet.create({
  container: {},

});

const Lecture = (order) => (
  <View style={styles.lecture}>{order}</View>
);

Lecture.propTypes = {
};

export default Lecture;
