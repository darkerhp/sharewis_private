/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["log"] }] */
export function checkStatus(result) {
  console.log('start checkStatus', result);
  if (result.ok) {
    return result;
  }
  throw new Error(result.statusText);
}

export function checkResult(json, ok) {
  if (ok(json)) {
    return json;
  }
  throw new Error(json);
}
