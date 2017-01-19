/**
* @flow
*/
import ReactNative from 'react-native';

const { Platform } = ReactNative;

const Variables = {
  hyperlink: '#2980b9',
  backgroundColor: '#579eff',
  onboardingBackgroundColor: '#e7eef0',
  courseListBackgroundColor: '#e7eef0',
  borderColor: '#ddd',
  textColor: '#4a4a4a',
  navbarHeight: Platform.select({
    ios: 65,
    android: 55,
  }),
  navBarBackgroundColor: '#00abca',
  disabledButtonColor: '#dadada',
};

export default Variables;

