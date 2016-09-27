// @flow
const totalDuration = (lectures) => {
  if (lectures.length > 0) {
    return lectures.map(l => l.estimatedTime || 0).reduce((a, b) => a + b);
  }
  return 0;
};


export default totalDuration;
