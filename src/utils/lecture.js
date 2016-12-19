import * as Const from '../constants/Api';

export const getNextVideoLecture = (courseId, lectures, skipCompleted = true, currentOrder = 0) => {
  let videoLectures = lectures.filter(l => (
    l.courseId === courseId &&
    l.kind === Const.LECTURE_KIND_LECTURE &&
    (l.type === Const.LECTURE_TYPE_VIDEO || l.type === Const.LECTURE_TYPE_TEXT) &&
    l.order > currentOrder
  ));
  if (skipCompleted) {
    videoLectures = videoLectures.filterNot(l => l.status === Const.LECTURE_STATUS_FINISHED);
  }
  return videoLectures.sortBy(l => l.order).first() || null;
};

export const getLastLectureId = (courseId, lectures) => {
  const videoLectures = lectures.filter(l => (
    l.courseId === courseId &&
    l.kind === Const.LECTURE_KIND_LECTURE &&
    (l.type === Const.LECTURE_TYPE_VIDEO || l.type === Const.LECTURE_TYPE_TEXT)
  ));

  return videoLectures.sortBy(l => l.order).last().id;
};
