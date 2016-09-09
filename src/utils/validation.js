/**
* @flow
*/

// Terribly simple and easily circumvented
export const isEmail = text =>
  (text instanceof String) && /.*?@.*?\.[a-z]{2,4}/.test(text);


/*
 * Password should contain at least:
 *  - one digit
 *  - one lower case
 *  - one upper case
 *  - 8 from the mentioned characters
 */
export const isPassword = text =>
  (text instanceof String) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(text);
