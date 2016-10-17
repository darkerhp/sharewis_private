import _ from 'lodash';
import { createSelector } from 'reselect';

import { LECTURE_STATUS_FINISHED } from '../constants/Api';

const getCourseSections = (state, props) => _.filter(
  state.entities.sections, { courseId: state.ui.courseDetailsView.currentCourseId }
);
const getCourseLectures = (state, props) => _.filter(
  state.entities.lectures, { courseId: state.ui.courseDetailsView.currentCourseId }
);

// sectionとlectureをマージした配列を取得する
export const getSectionMergedLectures = createSelector(
  [getCourseSections, getCourseLectures],
  (sections, lectures) => (
    _.sortBy(_.values(sections).concat(_.values(lectures)), ['order'])
  )
);

// lectureProgressを取得する
export const getLectureProgress = createSelector(
  [getCourseLectures],
  lectures => (
    _.values(lectures).filter(l => l.status === LECTURE_STATUS_FINISHED).length
  )
);

// レクチャーの合計時間を取得する
export const getLectureTotalDuration = createSelector(
  [getCourseLectures],
  (lectures) => {
    if (_.isEmpty(lectures)) return 0;
    return _.reduce(
      _.values(lectures),
      (result, value, key) => result + (value.estimatedTime || 0),
    0);
  }
);

