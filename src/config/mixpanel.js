/* global __DEV__ */
import Mixpanel from 'react-native-mixpanel';
import { Platform } from 'react-native';

export default function setupMixpanel() {
  let MIXPANEL_TOKEN = 'e2a2dca43a98876ca4b3e1983488e68f';
  if (__DEV__) {
    MIXPANEL_TOKEN = '0d112ce20e63f5b74a8da0adff569be1';
  }

  Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);
}
