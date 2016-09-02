import React from 'react';
import ReactNative from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

import Slide from '../components/Onboarding/Slide';
import Login from '../components/Login';

const {
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  wrapper: {
  },
  buttonText: {
    fontSize: 17,
    color: '#007aff',
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    alignItems: 'flex-end',
  },
  dotStyles: {
    width: 7,
    height: 7,
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
  },
  pagination: {
    top: 40,
    bottom: 0,
    alignItems: 'flex-start',
  },
});

// i18n TODO 多言語化
const t = {
  slide1Text: 'ShareWis ACT ビューワーアプリはShareWis ACTで購入したコースを閲覧するためのアプリです。',
  slide2Text: 'アプリを使えば、コースの動画を事前にダウンロードして、通信費を気にすることなく受講することができます。',
  slide3Text: 'アカウントをお持ちでない方、購入済みのコースがない方は、ShareWis ACTのサイトよりお手続きを進めてください。',
  back: '戻る',
  next: '次へ',
};

// images
const slide1ImageSrc = require('../components/Onboarding/images/slide1.png');
const slide2ImageSrc = require('../components/Onboarding/images/slide2.png');
const slide3ImageSrc = require('../components/Onboarding/images/slide3.png');

const Onboarding = () =>
  <Swiper
    style={styles.wrapper}
    showsButtons
    loop={false}
    dot={<View style={[{ backgroundColor: 'rgba(0,0,0,.2)' }, styles.dotStyles]} />}
    activeDot={<View style={[{ backgroundColor: 'gray' }, styles.dotStyles]} />}
    paginationStyle={styles.pagination}
    prevButton={<Text style={styles.buttonText}>{t.back}</Text>}
    nextButton={<Text style={styles.buttonText}>{t.next}</Text>}
    buttonWrapperStyle={styles.buttonWrapper}
  >
    <Slide
      text={t.slide1Text}
      imageSrc={slide1ImageSrc}
    />
    <Slide
      text={t.slide2Text}
      imageSrc={slide2ImageSrc}
    />
    <Slide
      text={t.slide3Text}
      imageSrc={slide3ImageSrc}
    />
    <Login />
  </Swiper>;

Onboarding.propTypes = {};
Onboarding.defaultProps = {};


export default connect(
  ({ routes }) => ({ routes })
)(Onboarding);
