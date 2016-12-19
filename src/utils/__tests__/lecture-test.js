/* eslint-disable no-undef */
import * as ApiConstants from '../../constants/Api';
import * as LectureUtils from '../lecture';
import { lectures } from '../../data/dummyData';

import Lecture from '../../models/Lecture';
import LectureMap from '../../models/LectureMap';

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
    const lectureMap = new LectureMap(lectures).map(lecture => new Lecture(lecture));

    let nextLecture = LectureUtils.getNextVideoLecture(180, lectureMap);
    expect(nextLecture.order).toEqual(5);

    nextLecture = LectureUtils.getNextVideoLecture(180, lectureMap, false);
    expect(nextLecture.order).toEqual(1);
  });

  it('should return last lectureId', () => {
    const lectureMap = new LectureMap(lectures).map(lecture => new Lecture(lecture));

    const lastLectureId = LectureUtils.getLastLectureId(180, lectureMap);
    expect(lastLectureId).toEqual(5930);
  });
});
