// @flow
const totalDuration = lectures =>
  lectures.map(l => l.duration || 0).reduce((a, b) => a + b);


export default totalDuration;
