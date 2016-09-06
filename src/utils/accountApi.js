/**
 * @flow
 */
/* global fetch */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import { ACCOUNT_API_URL } from '../constants/Api';
import { checkStatus, checkResult } from './apiUtils';


export const getUserData = async credentials => {
  console.log('start /users/me request');
  // Run query
  const result = await fetch(`${ACCOUNT_API_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${credentials[0]}:${credentials[1]}`,
    },
  });
  // Verify results
  await checkStatus(result);
  const json = await result.json();
  await checkResult(json, user => user.username);
  // Parse and return results

  return {
    userName: json.username,
    nickName: json.nickname,
  };
};
