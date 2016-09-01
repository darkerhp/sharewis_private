import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;
const { View, StyleSheet, Text, Dimensions, Image } = ReactNative;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slideImageContainer: {
    flex: 2,
    backgroundColor: '#ecf1f3',
  },
  slideImage: {
    flex: -1,
    justifyContent: 'center',
    marginTop: 90,
    marginBottom: 30,
    width,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 25,
    opacity: 0.6,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222222',
  },
});

const Slide = ({ text, imageSrc }) =>
  <View style={styles.slide}>
    <View style={styles.slideImageContainer}>
      <Image
        source={imageSrc}
        style={styles.slideImage}
        resizeMode={'contain'}
      />
    </View>
    <View style={styles.content}>
      <Text style={styles.contentText}>
        {text}
      </Text>
    </View>
  </View>;

Slide.propTypes = {
  text: PropTypes.string,
  imageSrc: PropTypes.number,
};

export default Slide;
