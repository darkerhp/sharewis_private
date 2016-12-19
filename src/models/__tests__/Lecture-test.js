/* eslint-disable no-undef */
import Lecture from '../../models/Lecture';

describe('Lecture Model', () => {
  describe('getLectureIconName', () => {
    it('should return video lecture icon name', () => {
      const lecture = new Lecture({ type: Lecture.TYPE_VIDEO });
      const expectedIconName = 'play-circle-filled';
      expect(lecture.getLectureIconName()).toEqual(expectedIconName);
    });

    it('should return text lecture icon name', () => {
      const lecture = new Lecture({ type: Lecture.TYPE_TEXT });
      const expectedIconName = 'text-format';
      expect(lecture.getLectureIconName()).toEqual(expectedIconName);
    });

    it('should return pdf lecture icon name', () => {
      const lecture = new Lecture({ type: Lecture.TYPE_PDF });
      const expectedIconName = 'picture-as-pdf';
      expect(lecture.getLectureIconName()).toEqual(expectedIconName);
    });

    it('should return audio lecture icon name', () => {
      const lecture = new Lecture({ type: Lecture.TYPE_AUDIO });
      const expectedIconName = 'audiotrack';
      expect(lecture.getLectureIconName()).toEqual(expectedIconName);
    });

    it('should return quiz lecture icon name', () => {
      const lecture = new Lecture({ type: Lecture.TYPE_QUIZ });
      const expectedIconName = 'question-answer';
      expect(lecture.getLectureIconName()).toEqual(expectedIconName);
    });
  });
});
