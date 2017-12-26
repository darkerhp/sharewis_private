import _ from 'lodash';
import { createSelector } from 'reselect';

export const sectionsSelector = (state, props) => {
  const sections = _.has(state, 'entities.sections')
    ? state.entities.sections
    : props.sections;
  const currentCourseId = _.has(state, 'ui.currentCourseId')
    ? state.ui.currentCourseId
    : props.currentCourseId;
  return sections.filter(l => l.courseId === currentCourseId);
};

export const lecturesSelector = (state, props) => {
  const lectures = _.has(state, 'entities.lectures')
    ? state.entities.lectures
    : props.lectures;
  const currentCourseId = _.has(state, 'ui.currentCourseId')
    ? state.ui.currentCourseId
    : props.currentCourseId;
  return lectures.filter(l => l.courseId === currentCourseId);
};

export const viewableLecturesSelector = createSelector(
  lecturesSelector,
  lectures => lectures.filter(l => l.isViewable())
);

// sectionとlectureをマージしたListを取得する
export const getSectionMergedLectureList = createSelector(
  sectionsSelector,
  lecturesSelector,
  (sections, lectures) => {
    if (!lectures) return {};
    return sections
      .toList()
      .concat(lectures.toList())
      .sortBy(l => l.order);
  }
);

// lectureProgressを取得する
export const getLectureProgress = createSelector(lecturesSelector, lectures =>
  lectures.count(l => l.isFinished())
);

// レクチャーの合計時間を取得する
export const getLectureTotalDuration = createSelector(
  lecturesSelector,
  lectures => {
    if (!lectures) return 0;
    return lectures.reduce((r, v) => r + (v.estimatedTime || 0), 0);
  }
);

// 次の未完了のレクチャーを取得する
export const getNextNotCompletedLecture = createSelector(
  viewableLecturesSelector,
  lectures =>
    lectures
      .filterNot(l => l.isFinished())
      .sortBy(l => l.order)
      .first()
);

// 次のレクチャーを取得する
export const getNextLecture = createSelector(
  viewableLecturesSelector,
  state => state.currentOrder || 0,
  (lectures, currentOrder) =>
    lectures
      .filter(l => l.order > currentOrder)
      .sortBy(l => l.order)
      .first()
);

/**
 * 最終レクチャーのIDを取得する
 */
export const getLastLectureId = createSelector(
  viewableLecturesSelector,
  lectures => lectures.sortBy(l => l.order).last().id
);
