// @flow
export const getLectureIconName = (lecture) => {
  switch (lecture.type) {
    case 'video':
      return 'play-circle-filled';
    case 'text':
      return 'text-format';
    case 'pdf':
      return 'picture-as-pdf';
    case 'audio':
      return 'audiotrack';
    case 'quiz':
      return 'question-answer';
    case 'attachment':
      return 'attachment';
    default:
      return 'error';  // TODO
  }
};

const sortByOrder = (a, b) => {
  if (a.order === b.order) return 0;
  return a.order < b.order ? -1 : 1;
};

export const getNextVideoLecture = (lectures, skipCompleted = true) => {
  let videoLectures = lectures.filter(l => l.kind === 'lecture' && l.type === 'video');
  if (skipCompleted) {
    videoLectures = videoLectures.filter(l => l.isCompleted === false);
  }
  return videoLectures.sort(sortByOrder)[0] || {};
};

export const getLectureById = (lectures, lectureId) =>
  lectures
    .filter(l => l.kind === 'lecture')
    .find(lecture => lecture.id === lectureId);
