import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Actions as RouterActions } from 'react-native-router-flux';

import BaseStyles from '../baseStyles';
import Slide from '../components/Onboarding/Slide';
import Signup from '../containers/Signup'; // eslint-disable-line

const {
  Platform,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  buttonText: {
    ...Platform.select({
      android: {
        marginBottom: 20,
      },
    }),
    fontSize: 17,
    color: BaseStyles.navBarBackgroundColor,
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
    alignItems: 'flex-start',
  },
});

// images
const slide1ImageSrc = require('../components/Onboarding/images/slide1.png');
const slide2ImageSrc = require('../components/Onboarding/images/slide2.png');
const slide3ImageSrc = require('../components/Onboarding/images/slide3.png');

@connect(({ user, routes }) => ({ user, routes }))
class Onboarding extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    const { user } = this.props;
    if (user.loggedIn || user.isFinishOnboarding) {
      RouterActions.top();
    }
  }

  render() {
    return (
      <Swiper
        showsButtons
        loop={false}
        dot={<View style={[{ backgroundColor: 'rgba(0,0,0,.2)' }, styles.dotStyles]} />}
        activeDot={<View style={[{ backgroundColor: 'gray' }, styles.dotStyles]} />}
        paginationStyle={styles.pagination}
        prevButton={<Text style={styles.buttonText}>{I18n.t('back')}</Text>}
        nextButton={<Text style={styles.buttonText}>{I18n.t('next')}</Text>}
        buttonWrapperStyle={styles.buttonWrapper}
      >
        <Slide
          text={I18n.t('slide1Text')}
          imageSrc={slide1ImageSrc}
        />
        <Slide
          text={I18n.t('slide2Text')}
          imageSrc={slide2ImageSrc}
        />
        <Slide
          text={I18n.t('slide3Text')}
          imageSrc={slide3ImageSrc}
        />
        <Signup />
      </Swiper>
    );
  }
}

export default Onboarding;
