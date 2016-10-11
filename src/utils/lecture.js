import _ from 'lodash';
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

export const getNextVideoLecture = (lectures, skipCompleted = true, currentOrder = 0) => {
  let videoLectures = _.filter(lectures, lecture => (
    lecture.kind === ApiConstants.LECTURE_KIND_LECTURE &&
    // TODO enable other lecture types
    lecture.type === ApiConstants.LECTURE_TYPE_VIDEO &&
    lecture.order > currentOrder
  ));

  if (skipCompleted) {
    videoLectures = _.filter(videoLectures, { status: ApiConstants.LECTURE_STATUS_FINISHED });
  }

  return _.sortBy(videoLectures, ['order'])[0] || {};
};

export const getLastLectureId = (lectures) => {
  const videoLectures = _.filter(lectures, lecture => (
    lecture.kind === ApiConstants.LECTURE_KIND_LECTURE &&
    // TODO enable other lecture types
    lecture.type === ApiConstants.LECTURE_TYPE_VIDEO
  ));

  return _.sortBy(videoLectures, ['order'])[videoLectures.length - 1].id;
};
