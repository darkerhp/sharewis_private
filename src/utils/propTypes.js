/**
* @flow
*/
import * as validate from './validation';

const t = {
  invalidEmail: 'Invalid email!',
};


export const email = (props, propName, componentIgnored) =>
  (!validate.isEmail(props[propName])) || new Error(t.invalidEmail);


export const password = (props, propName, componentIgnored) =>
  (!validate.isPassword(props[propName])) || new Error(t.invalidPassword);
