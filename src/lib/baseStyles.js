/**
 * @flow
 */
import ReactNative from 'react-native';

const { Dimensions, Platform } = ReactNative;
const width = Dimensions.get('window').width
const height= Dimensions.get('window').height

const Variables = {
  hyperlink: '#00abc9',
  backgroundColor: '#579eff',
  onboardingBackgroundColor: '#e7eef0',
  courseListBackgroundColor: '#e7eef0',
  borderColor: '#ddd',
  textColor: '#4a4a4a',
  navbarHeight: Platform.select({
    ios: 65,
    android: 55
  }),
  navBarBackgroundColor: '#00abc9',
  disabledButtonColor: '#dadada',
  deviceWidth:width,
  deviceHeight:height
};

export default Variables;
