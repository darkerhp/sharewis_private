import React  from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import BaseStyles from '../../lib/baseStyles';
import { ACT_SITE_URL } from '../../lib/constants';
import redirectTo from '../../utils/linking';

const {
  StyleSheet,
  Text,
  Image,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slideImageContainer: {
    flex: 2,
    backgroundColor: BaseStyles.onboardingBackgroundColor,
  },
  slideImage: {
    flex: -1,
    justifyContent: 'center',
    marginTop: 90,
    marginBottom: 30,
    width: BaseStyles.deviceWidth,
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
    color: '#222',
  },
});


const Slide = ({ text, imageSrc }) =>
  (
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
          linkText={url => (url === ACT_SITE_URL ? I18n.t('actWebsite') : url)}
          onPress={redirectTo}
        >

          <Text style={styles.contentText}>
            {text}
          </Text>
        </Hyperlink>
      </View>
    </View>
  );

Slide.propTypes = {
  text: PropTypes.string.isRequired,
  imageSrc: PropTypes.number.isRequired,
};

export default Slide;
