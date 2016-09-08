/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import { Linking } from 'react-native';


const redirectTo = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      return Linking.openURL(url);
    }
    console.log(`Can't handle url: ${url}`);
    return false;
  }).catch(err => console.error('An error occurred', err));
};

export default redirectTo;
