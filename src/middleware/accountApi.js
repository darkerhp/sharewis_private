/**
 * @flow
 */
/* global fetch */
/* eslint no-console: ["error", { allow: ["log"] }] */
import { ACCOUNT_API_URL } from '../constants/Api';
import { checkStatus, checkResult } from '../utils/apiUtils';


const getUserData = (async) (credentials) => {
  // Run query
  console.log('start /user/me request');
  const result = await fetch(`${ACCOUNT_API_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${credentials[0]}:${credentials[1]}`,
    },
  });
  // Verify results
  await checkStatus(result);
  console.log('jsonize', result);
  await setTimeout(() => null, 200);
  const json = await result.json();
  // const text = await result.text();
  // const json = JSON.parse(text);
  console.log('checkresult');
  await checkResult(json, user => user.username);

  // Parse and return results
  console.log('YES SUCCESS');
  return {
    userName: json.username,
    nickName: json.nickname,
  };
};


export default getUserData;
