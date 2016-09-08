/**
 * @flow
 */
/* eslint no-console: ["error", { allow: ["log"] }] */
export function checkStatus(result) {
  if (result.ok) {
    return result;
  }
  const error = new Error(result.statusText);
  throw error;
}

export function checkResult(json, ok) {
  if (ok(json)) {
    return json;
  }
  throw new Error(json);
}
