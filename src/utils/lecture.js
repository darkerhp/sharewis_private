import * as Const from '../constants/Api';

// @flow
export const getLectureIconName = (lecture) => {
  switch (lecture.type) {
    case Const.LECTURE_TYPE_VIDEO:
      return 'play-circle-filled';
    case Const.LECTURE_TYPE_TEXT:
      return 'text-format';
    case Const.LECTURE_TYPE_PDF:
      return 'picture-as-pdf';
    case Const.LECTURE_TYPE_AUDIO:
      return 'audiotrack';
    case Const.LECTURE_TYPE_QUIZ:
      return 'question-answer';
    case Const.LECTURE_TYPE_ATTACHMENT:
      return Const.LECTURE_TYPE_ATTACHMENT;
    default:
      return 'error';  // TODO
  }
};

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
