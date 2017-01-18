/* eslint-disable no-undef */
import { lectures } from '../../data/dummyData';

import Lecture from '../../models/Lecture';
import LectureMap from '../../models/LectureMap';

describe('LectureMap', () => {
  it('should return next lecture', () => {
    const lectureMap = new LectureMap(lectures).map(lecture => new Lecture(lecture));

    let nextLecture = lectureMap.getNextLecture(180);
    expect(nextLecture.order).toEqual(5);

    nextLecture = lectureMap.getNextLecture(180, false);
    expect(nextLecture.order).toEqual(1);
  });

  it('should return last lectureId', () => {
    const lectureMap = new LectureMap(lectures).map(lecture => new Lecture(lecture));

    const lastLectureId = lectureMap.getLastLectureId(180, lectureMap);
    expect(lastLectureId).toEqual(5930);
  });
});
