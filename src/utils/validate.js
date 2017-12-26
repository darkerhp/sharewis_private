/**
 * @flow
 */
import I18n from 'react-native-i18n';

const validateEmailLogin = values => {
  const errors = {};
  if (!values.email) {
    errors.email = I18n.t('required');
  }
  if (!values.password) {
    errors.password = I18n.t('required');
  }

  return errors;
};

export default validateEmailLogin;
