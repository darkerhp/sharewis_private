// redux-persist用のカスタムtransform
// https://github.com/rt2zz/redux-persist#transforms
// entities内のMapの値が空のObjectがStorage保存される時がある？
// その場合、reducerのrehydrateでImmutableに変換できないため、このカスタムTransformで変換する。
import { createTransform } from 'redux-persist';
import _ from 'lodash';

import CourseMap from '../modules/models/CourseMap';
import LectureMap from '../modules/models/LectureMap';

const transform = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (inboundState, key) => inboundState,
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState, key) => {
    const { courses, lectures, sections } = outboundState;

    return {
      ...outboundState,
      courses: _.isEmpty(courses) ? new CourseMap() : courses,
      lectures: _.isEmpty(lectures) ? new LectureMap() : lectures,
      sections: _.isEmpty(sections) ? new LectureMap() : sections,
    };
  },
  // configuration options
  { whitelist: ['entities'] },
);

export default transform;
