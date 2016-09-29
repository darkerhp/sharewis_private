import * as ApiConstants from '../constants/Api';

// @flow
export const getLectureIconName = (lecture) => {
  switch (lecture.type) {
    case ApiConstants.LECTURE_TYPE_VIDEO:
      return 'play-circle-filled';
    case ApiConstants.LECTURE_TYPE_TEXT:
      return 'text-format';
    case ApiConstants.LECTURE_TYPE_PDF:
      return 'picture-as-pdf';
    case ApiConstants.LECTURE_TYPE_AUDIO:
      return 'audiotrack';
    case ApiConstants.LECTURE_TYPE_QUIZ:
      return 'question-answer';
    case ApiConstants.LECTURE_TYPE_ATTACHMENT:
      return ApiConstants.LECTURE_TYPE_ATTACHMENT;
    default:
      return 'error';  // TODO
  }
};

const sortByOrder = (a, b) => {
  if (a.order === b.order) return 0;
  return a.order < b.order ? -1 : 1;
};

export const getNextVideoLecture = (lectures, skipCompleted = true) => {
  let videoLectures = lectures.filter(l => l.kind === 'lecture' && l.type === ApiConstants.LECTURE_TYPE_VIDEO);
  if (skipCompleted) {
    videoLectures = videoLectures.filter(l => l.status === 'not_started');
  }
  return videoLectures.sort(sortByOrder)[0] || {};
};

export const getLectureByOrder = (lectures, order) =>
  lectures
    .filter(l => l.kind === 'lecture')
    .find(lecture => lecture.order === order);
