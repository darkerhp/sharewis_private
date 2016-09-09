/**
* @flow
*/
import * as validate from './validation';

const t = {
  invalidEmail: 'Invalid email!',
};


export const email = (props, propName, component) => {
  console.log('and component is: ', typeof(component));
  debugger;
  return (!validate.isEmail(props[propName])) || new Error(t.invalidEmail);
}


export const password = (props, propName, componentIgnored) =>
  (!validate.isPassword(props[propName])) || new Error(t.invalidPassword);
