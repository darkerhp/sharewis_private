/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import ReactNative from 'react-native';
import { Client } from 'bugsnag-react-native';

const { Linking } = ReactNative;


const redirectTo = url =>
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
    return false;
  }).catch((error) => {
    new Client().notify(error);
    console.error('An error occurred', error);
  });


export default redirectTo;
