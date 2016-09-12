/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import ReactNative from 'react-native';

const { Linking } = ReactNative;


const redirectTo = url =>
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
    return false;
  }).catch(err => console.error('An error occurred', err));


export default redirectTo;
