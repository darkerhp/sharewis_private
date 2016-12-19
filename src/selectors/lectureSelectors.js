import { createSelector } from 'reselect';

const getCourseSections = (state, props) =>
  state.entities.sections.filter(l => l.courseId === state.ui.currentCourseId);

const getCourseLectures = (state, props) =>
  state.entities.lectures.filter(l => l.courseId === state.ui.currentCourseId);

// sectionとlectureをマージした配列を取得する
export const getSectionMergedLectures = createSelector(
  [getCourseSections, getCourseLectures],
  (sections, lectures) => {
    if (!lectures) return {};
    return sections.toList().merge(lectures.toList()).sortBy(l => l.order);
  },
);

// lectureProgressを取得する
export const getLectureProgress = createSelector(
  [getCourseLectures],
  lectures => (
    lectures.count(l => l.isFinished())
  ),
);

// レクチャーの合計時間を取得する
export const getLectureTotalDuration = createSelector(
  [getCourseLectures],
  (lectures) => {
    if (!lectures) return 0;
    return lectures.reduce((r, v) => r + (v.estimatedTime || 0), 0);
  },
);

