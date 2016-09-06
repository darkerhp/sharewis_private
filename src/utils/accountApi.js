/**
 * @flow
 */
import { checkStatus, checkResult } from './apiUtils'


export async function getUserData(credentials) {
  // Run query
  const result = await fetch(ACCOUNT_API_URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${credentials[0]}:${credentials[1]}`,
    },
  });
  // Verify results
  checkStatus(result);
  const json = result.json();
  checkResult(json, user => user.username);
  // Parse and return results

  return {
    userName: json.username,
    nickName: json.nickname
  }
}
