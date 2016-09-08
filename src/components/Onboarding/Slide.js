import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import BaseStyles from '../../baseStyles';
import { ACT_API_URL } from '../../constants/Api';
import BaseTranslations from '../../translations';
import redirectTo from '../../utils/linking';

const { PropTypes } = React;
const {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
} = ReactNative;
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
    backgroundColor: BaseStyles.onboardingBgLightBlue,
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
  contentText: BaseStyles.Text,
});

const t = {
  ...BaseTranslations,
};


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
      <Hyperlink
        style={{ flex: 1 }}
        linkStyle={{ color: BaseStyles.hyperlink }}
        linkText={url => (url === ACT_API_URL ? t.actWebsite : url)}
        onPress={redirectTo}
      >

        <Text style={styles.contentText}>
          {text}
        </Text>
      </Hyperlink>
    </View>
  </View>;

Slide.propTypes = {
  text: PropTypes.string,
  imageSrc: PropTypes.number,
};

export default Slide;
