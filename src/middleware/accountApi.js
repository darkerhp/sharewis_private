/**
 * @flow
 */
/* global fetch */
import { ACCOUNT_API_URL } from '../constants/Api';
import { checkStatus, checkResult } from '../utils/apiUtils';


const getUserData = (async) (credentials) => {
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
  await setTimeout(() => null, 200);
  const json = await result.json();
  // const text = await result.text();
  // const json = JSON.parse(text);
  await checkResult(json, user => user.username);

  // Parse and return results
  return {
    userName: json.username,
    nickName: json.nickname,
  };
};


export default getUserData;
