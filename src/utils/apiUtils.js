export function checkStatus(result) {
  if (result.ok) {
    return result;
  }
  const error = new Error(result.statusText);
  error.resultponse = result;
  throw error;
}

export function checkResult(json, ok) {
  if (ok(json)) {
    return json;
  }
  throw new Error(json);
}
