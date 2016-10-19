/* eslint-disable no-undef */
import * as ApiConstants from '../../constants/Api';
import * as LectureUtils from '../lecture';
import { lectures } from '../../data/dummyData';


describe('LectureUtils Utils', () => {
  describe('getLectureIconName', () => {
    const lecture = { type: ApiConstants.LECTURE_TYPE_VIDEO };

    it('should return video lecture icon name', () => {
      const expectedIconName = 'play-circle-filled';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return text lecture icon name', () => {
      lecture.type = ApiConstants.LECTURE_TYPE_TEXT;
      const expectedIconName = 'text-format';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return pdf lecture icon name', () => {
      lecture.type = ApiConstants.LECTURE_TYPE_PDF;
      const expectedIconName = 'picture-as-pdf';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return audio lecture icon name', () => {
      lecture.type = ApiConstants.LECTURE_TYPE_AUDIO;
      const expectedIconName = 'audiotrack';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });

    it('should return quiz lecture icon name', () => {
      lecture.type = ApiConstants.LECTURE_TYPE_QUIZ;
      const expectedIconName = 'question-answer';
      expect(LectureUtils.getLectureIconName(lecture)).toEqual(expectedIconName);
    });
  });

  it('should return next video lecture', () => {
    nextLecture = LectureUtils.getNextVideoLecture(180, lectures);
    expect(nextLecture.order).toEqual(5);

    nextLecture = LectureUtils.getNextVideoLecture(180, lectures, false);
    expect(nextLecture.order).toEqual(1);
  });
});
