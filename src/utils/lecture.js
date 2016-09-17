// @flow
export const getLectureIconName = (lecture) => {
  switch (lecture.type) {
    case 'VideoLecture':
      return 'play-circle-filled';
    case 'TextLecture':
      return 'text-format';
    case 'PdfLecture':
      return 'picture-as-pdf';
    case 'AudioLecture':
      return 'audiotrack';
    case 'QuizLecture':
      return 'question-answer';
    default:
      return null; // TODO
  }
};

export const getNextVideoLecture = (lectures, ignoreCompleted = true) => {
  const filteredLecture = lectures
    .filter(l =>
      l.kind === 'lecture'
      && l.type === 'VideoLecture'
      && l.isCompleted === !ignoreCompleted
    ).sort((a, b) => {
      if (a.order === b.order) return 0;
      return a.order < b.order ? -1 : 1;
    });
  return filteredLecture[0] || {};
};

export const getLectureById = (lectures, lectureId) => {
  return lectures
    .filter(l => l.kind === 'lecture')
    .find((lecture) => lecture.id === lectureId);
};
