/**
 * @flow
 * これmiddlewareじゃない
 */
/* global fetch */
import { ACCOUNT_API_URL } from '../constants/Api';
import { checkStatus, checkResult } from '../utils/api';


export const getUserData = async (credentials: Array<string>) => {
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
    userId: json.id,
    userName: json.username,
    nickName: json.nickname,
    email: json.email,
    isPremium: json.is_premium,
  };
};

export const signupByEmail = async (credentials: Array<string>) => {
  console.log('start signup', credentials);

  const body = { email: credentials[0], password: credentials[1] };
  console.log('body: ', body);

  const result = await fetch(`${ACCOUNT_API_URL}/users/signup`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  // Verify results
  await checkStatus(result);
  await setTimeout(() => null, 200);
  const json = await result.json();

  console.log('signup done:', json);

  await checkResult(json, user => user.username);

  // Parse and return results
  return {
    userId: json.id,
    userName: json.username,
    nickName: json.nickname,
    email: json.email,
    isPremium: json.is_premium,
  };
};
