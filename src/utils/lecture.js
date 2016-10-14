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

export const getNextVideoLecture = (courseId, lectures, skipCompleted = true, currentOrder = 0) => {
  let videoLectures = _.filter(lectures, lecture => (
    lecture.courseId === courseId &&
    lecture.kind === ApiConstants.LECTURE_KIND_LECTURE &&
    lecture.type === ApiConstants.LECTURE_TYPE_VIDEO && // TODO enable other lecture types
    lecture.order > currentOrder
  ));

  if (skipCompleted) {
    videoLectures = _.reject(videoLectures, { status: ApiConstants.LECTURE_STATUS_FINISHED });
  }

  return _.sortBy(videoLectures, ['order'])[0] || {};
};

export const getLastLectureId = (courseId, lectures) => {
  const videoLectures = _.filter(lectures, lecture => (
    lecture.courseId === courseId &&
    lecture.kind === ApiConstants.LECTURE_KIND_LECTURE &&
    lecture.type === ApiConstants.LECTURE_TYPE_VIDEO // TODO enable other lecture types
  ));

  return _.sortBy(videoLectures, ['order'])[videoLectures.length - 1].id;
};
