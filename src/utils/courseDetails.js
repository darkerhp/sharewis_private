// @flow
import _ from 'lodash';

const totalDuration = (lectures) => {
  if (_.isEmpty(lectures)) return 0;
  return _.reduce(lectures, (result, value, key) => result + (value.estimatedTime || 0), 0);
};

export default totalDuration;
