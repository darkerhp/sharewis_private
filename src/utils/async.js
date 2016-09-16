// Transform callback-expecting functions into Promises for async usage
const promisify = (method, ...args) =>
  new Promise((resolve, reject) =>
    method(...args, (err, result) => (
      err ? reject(err) : resolve(result)
    ))
  );

export default promisify;
