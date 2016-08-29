/**
 * @flow
 */
import React from 'react';
import ReactNative from 'react-native';
import Swiper from 'react-native-swiper'

import AppStyles from '../styles';

// const { Component, PropTypes } = React;
const { StyleSheet, Text, View, Image, Dimensions } = ReactNative;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    width: width,
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
    marginBottom: 3
  },
  pagination: {
    top: 40,
    bottom: 0,
    alignItems: 'flex-start',
  },
});

class Onboarding extends React.Component {
  render() {
    return (
      <Swiper style={styles.wrapper}
              showsButtons={true}
              loop={false}
              dot={<View style={[{backgroundColor:'rgba(0,0,0,.2)'}, styles.dotStyles]} />}
              activeDot={<View style={[{backgroundColor: 'gray'}, styles.dotStyles]} />}
              paginationStyle={styles.pagination}
              prevButton={<Text style={styles.buttonText}>{t.back}</Text>}
              nextButton={<Text style={styles.buttonText}>{t.next}</Text>}
              buttonWrapperStyle={styles.buttonWrapper}
      >
        <View style={styles.slide}>
          <View style={styles.slideImageContainer}>
            <Image
              source={require('./../img/slide1.png')} // TODO 画像
              style={styles.slideImage}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              {t.slide1Text}
            </Text>
          </View>
        </View>
        <View style={styles.slide}>
          <View style={styles.slideImageContainer}>
            <Image
              source={require('./../img/slide2.png')} // TODO 画像
              style={styles.slideImage}
              resizeMode={'contain'}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              {t.slide2Text}
            </Text>
          </View>
        </View>
        <View style={styles.slide}>
          <View style={styles.slideImageContainer}>
            <Image
              source={require('./../img/slide3.png')} // TODO 画像
              style={styles.slideImage}
              resizeMode={'contain'}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              {t.slide3Text}
            </Text>
          </View>
        </View>
        <View style={styles.slide}>
          <Text style={{ color: '#999' }}>ログイン</Text>
        </View>
      </Swiper>
    );
  }
}

//i18n TODO 多言語化
const t = {
  slide1Text: 'ShareWis ACT ビューワーアプリはShareWis ACTで購入したコースを閲覧するためのアプリです。',
  slide2Text: 'アプリを使えば、コースの動画を事前にダウンロードして、通信費を気にすることなく受講することができます。',
  slide3Text: 'アカウントをお持ちでない方、購入済みのコースがない方は、ShareWis ACTのサイトよりお手続きを進めてください。',
  slide4Text: '学びの旅に出かけましょう。',
  back: '戻る',
  next: '次へ',
  skip: '今すぐ使う'
};


Onboarding.propTypes = {};
Onboarding.defaultProps = {};

export default Onboarding;
