/* eslint-disable no-undef */
import * as LectureUtils from '../lecture';
import { lectures } from '../../data/dummyData';

import Lecture from '../../models/Lecture';
import LectureMap from '../../models/LectureMap';

describe('LectureUtils Utils', () => {
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
