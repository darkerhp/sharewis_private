// @flow
export const getLectureIconName = lecture => {
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
      return null;
  }
};

export default getLectureIconName;
