/**
* @flow
*/

const t = {
  required: '必要です',
  badEmail: 'メールではありません',
};

// Terribly simple and easily circumvented
const isEmail = text =>
  (text instanceof String) && /.*?@.*?\.[a-z]{2,4}/.test(text);


const validateEmailLogin = (values) => {
  console.log('in validateEmailLogin:', values);
  const errors = {};
  if (!values.email) {
    errors.email = t.required;
  }
  if (!values.password) {
    errors.password = t.required;
  }
  if (!isEmail(values.email)) {
    errors.email = t.badEmail;
  }
  return errors;
};


export default validateEmailLogin;
