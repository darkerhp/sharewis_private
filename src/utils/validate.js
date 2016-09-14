/**
* @flow
*/
/* eslint no-console: ["error", { allow: ["log"] }] */

const t = {
  required: '必要です',
  badEmail: 'メールではありません',
};

// Terribly simple and easily circumvented
const isEmail = text =>
  (typeof text === 'string') && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text);


const validateEmailLogin = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = t.required;
  }
  // else if (!isEmail(values.email)) {
  //   errors.email = t.badEmail;
  // }
  if (!values.password) {
    errors.password = t.required;
  }

  return errors;
};


export default validateEmailLogin;
