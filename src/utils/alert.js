// @flow
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

const { Alert } = ReactNative;

const alertOfflineError = () =>
  Alert.alert(I18n.t('offlineErrorTitle'), I18n.t('offlineErrorMessage'), [
    { text: I18n.t('close') }
  ]);

export default alertOfflineError;
