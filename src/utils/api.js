/**
 * @flow
 */
export function checkStatus(result) {
  console.log('checkStatus', result);
  if (result.ok) {
    return result;
  }
  throw new Error(result.statusText);
}

export function checkResult(json, ok) {
  console.log('checkResult', json);
  if (ok(json)) {
    return json;
  }
  throw new Error(json);
}
