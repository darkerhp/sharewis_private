import { createSelector } from 'reselect';

const sectionsSelector = (state, props) =>
  state.entities.sections.filter(l => l.courseId === state.ui.currentCourseId);

const lecturesSelector = (state, props) =>
  state.entities.lectures.filter(l => l.courseId === state.ui.currentCourseId);

// sectionとlectureをマージしたListを取得する
export const getSectionMergedLectureList = createSelector(
  sectionsSelector,
  lecturesSelector,
  (sections, lectures) => {
    if (!lectures) return {};
    return sections.toList().concat(lectures.toList()).sortBy(l => l.order);
  },
);

// lectureProgressを取得する
export const getLectureProgress = createSelector(
  lecturesSelector,
  lectures => (
    lectures.count(l => l.isFinished())
  ),
);

// レクチャーの合計時間を取得する
export const getLectureTotalDuration = createSelector(
  lecturesSelector,
  (lectures) => {
    if (!lectures) return 0;
    return lectures.reduce((r, v) => r + (v.estimatedTime || 0), 0);
  },
);

