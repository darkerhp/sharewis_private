import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import BaseStyles from '../../lib/baseStyles';

const { View, StyleSheet, Text } = ReactNative;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 7,
    borderColor: BaseStyles.borderColor,
    borderBottomWidth: 1,
  },
  sectionTitleText: {
    fontSize: 14,
    color: BaseStyles.textColor,
  },
});

const Section = ({ lecture }) =>
  (
    <View style={styles.container}>
      <Text style={styles.sectionTitleText}>{lecture.title}</Text>
    </View>
  );


Section.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  lecture: PropTypes.object.isRequired,
};

export default Section;
