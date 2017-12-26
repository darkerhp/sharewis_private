import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import Course from '../../modules/models/Course';
import Product from '../../modules/models/Product';
import OneColumnItemBox from './OneColumnItemBox';
import BaseStyles from '../../lib/baseStyles';

const { Image, Platform, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 5,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9
  },
  detailsWrapper: {
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-around'
  },
  disabledCourse: {
    ...Platform.select({
      android: {
        opacity: 0.2
      },
      ios: {
        opacity: 0.4
      }
    })
  },
  title: {
    color: '#222',
    fontSize: 16
  },
  priceArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  priceWrapper: {
    flex: 1,
    maxHeight: 33,
    paddingRight: 8,
    paddingLeft: 11,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: BaseStyles.navBarBackgroundColor,
    borderRadius: 4
  },
  priceText: {
    alignItems: 'center',
    fontWeight: '600',
    color: BaseStyles.navBarBackgroundColor,
    fontSize: 18
  }
});

const CourseSummary = ({ course, product, onPressCourse, style }) => (
  <OneColumnItemBox
    style={[styles.container, style]}
    onPress={() => onPressCourse(product.priceString)}
  >
    <View style={{ flex: 1 }}>
      <Image
        style={styles.image}
        source={{ uri: course.imageUrl }}
        resizeMode={Image.resizeMode.stretch}
      />
      <View style={styles.detailsWrapper}>
        <Text style={styles.title}>{course.title}</Text>
        <View style={styles.priceArea}>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>{product.priceString}</Text>
          </View>
        </View>
      </View>
    </View>
  </OneColumnItemBox>
);

CourseSummary.propTypes = {
  course: PropTypes.instanceOf(Course).isRequired,
  product: PropTypes.instanceOf(Product).isRequired,
  onPressCourse: PropTypes.func.isRequired,
  style: PropTypes.any, // eslint-disable-line
};

export default CourseSummary;
