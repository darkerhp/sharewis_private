/**
* @flow
*/

const t = {
  required: 'Required',
  badEmail: 'This is not an email',
};

// Terribly simple and easily circumvented
const isEmail = text =>
  (text instanceof String) && /.*?@.*?\.[a-z]{2,4}/.test(text);


const validateEmailLogin = values => {
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
