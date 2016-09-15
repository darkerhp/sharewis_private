/* eslint-disable no-undef */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import * as LectureUtils from '../lecture';

describe('LectureUtils Utils', () => {
  describe('getLectureIconName', () => {
    let lecture = {
      order: 3,
      title: 'レクチャーC',
      kind: 'lecture',
      duration: 90,
      isCompleted: false,
      type: 'VideoLecture',
    };

    it('should return video lecture icon name', () => {
      const expectedIconName = 'play-circle-filled';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName)
    });

    it('should return text lecture icon name', () => {
      lecture.type = 'TextLecture';
      const expectedIconName = 'text-format';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName)
    });

    it('should return pdf lecture icon name', () => {
      lecture.type = 'PdfLecture';
      const expectedIconName = 'picture-as-pdf';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName)
    });

    it('should return audio lecture icon name', () => {
      lecture.type = 'AudioLecture';
      const expectedIconName = 'audiotrack';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName)
    });

    it('should return quiz lecture icon name', () => {
      lecture.type = 'QuizLecture';
      const expectedIconName = 'question-answer';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName)
    });
  });
});
