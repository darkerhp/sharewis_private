import React from 'react';
import ReactNative from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import { ACT_API_URL } from '../constants/Api';
import Slide from '../components/Onboarding/Slide';
import Login from './Login';

I18n.fallbacks = true;

const {
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
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

I18n.translations = {
  ja: {
    slide1Text: 'ShareWis ACT ビューワーアプリはShareWis ACTで購入したコースを閲覧するためのアプリです。',
    slide2Text: 'アプリを使えば、コースの動画を事前にダウンロードして、通信費を気にすることなく受講することができます。',
    slide3Text: `アカウントをお持ちでない方、購入済みのコースがない方は、 ${ACT_API_URL} よりお手続きを進めてください。`,
    back: '戻る',
    next: '次へ',
  },
  en: {
    slide1Text: 'The ShareWis ACT viewer app allows you to browse purchased contents from ShareWis ACT.',
    slide2Text: 'It allows you to download videos offline so that you do not need to worry about roaming costs.',
    slide3Text: `If you do not yet have an account, please complete the signup procedure on ${ACT_API_URL}.`,
    back: 'Back',
    next: 'Next',
  },
  vn: {
    slide1Text: 'Ứng dụng xem ShareWis ACT cho phép bạn duyệt nội dung mua từ ShareWis ACT.',
    slide2Text: 'Nó cho phép bạn tải video trên mạng, do đó bạn không cần phải lo lắng về chi phí chuyển vùng.',
    slide3Text: `Nếu bạn chưa có tài khoản, xin vui lòng hoàn thành các thủ tục đăng ký trên ${ACT_API_URL}.`,
    back: 'Trở lại',
    next: 'kế tiếp',
  },
};

// images
const slide1ImageSrc = require('../components/Onboarding/images/slide1.png');
const slide2ImageSrc = require('../components/Onboarding/images/slide2.png');
const slide3ImageSrc = require('../components/Onboarding/images/slide3.png');

const Onboarding = () =>
  <Swiper
    showsButtons
    loop={false}
    dot={<View style={[{ backgroundColor: 'rgba(0,0,0,.2)' }, styles.dotStyles]} />}
    activeDot={<View style={[{ backgroundColor: 'gray' }, styles.dotStyles]} />}
    paginationStyle={styles.pagination}
    prevButton={<Text style={styles.buttonText}>{I18n.t.back}</Text>}
    nextButton={<Text style={styles.buttonText}>{I18n.t.next}</Text>}
    buttonWrapperStyle={styles.buttonWrapper}
  >
    <Slide
      text={I18n.t.slide1Text}
      imageSrc={slide1ImageSrc}
    />
    <Slide
      text={I18n.t.slide2Text}
      imageSrc={slide2ImageSrc}
    />
    <Slide
      text={I18n.t.slide3Text}
      imageSrc={slide3ImageSrc}
    />
    <Login />
  </Swiper>;


export default connect(
  ({ routes }) => ({ routes })
)(Onboarding);
