import React from 'react';
import ReactNative from 'react-native';

const { Component, PropTypes } = React;
const { View, StyleSheet, Text, Slider, Dimensions } = ReactNative;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 7,
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  sectionTitleText: {
    fontSize: 14,
    color: '#525252',
  },
});

const Section = ({ lecture }) =>
  <View style={styles.container}>
    <Text style={styles.sectionTitleText}>{lecture.title}</Text>
  </View>;


Section.propTypes = {
  lecture: PropTypes.object.isRequired
};

export default Section;
