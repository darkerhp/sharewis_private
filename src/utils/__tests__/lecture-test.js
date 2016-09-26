/* eslint-disable no-undef */
import * as LectureUtils from '../lecture';
import { lectures } from '../../data/dummyData';


describe('LectureUtils Utils', () => {
  describe('getLectureIconName', () => {
    const lecture = { type: 'VideoLecture' };

    it('should return video lecture icon name', () => {
      const expectedIconName = 'play-circle-filled';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return text lecture icon name', () => {
      lecture.type = 'TextLecture';
      const expectedIconName = 'text-format';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return pdf lecture icon name', () => {
      lecture.type = 'PdfLecture';
      const expectedIconName = 'picture-as-pdf';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return audio lecture icon name', () => {
      lecture.type = 'AudioLecture';
      const expectedIconName = 'audiotrack';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return quiz lecture icon name', () => {
      lecture.type = 'QuizLecture';
      const expectedIconName = 'question-answer';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });
  });

  it('should return next video lecture', () => {
    nextLecture = LectureUtils.getNextVideoLecture(lectures);
    expect(nextLecture.order).toEqual(8);

    nextLecture = LectureUtils.getNextVideoLecture(lectures, false);
    expect(nextLecture.order).toEqual(1);
  });
});
