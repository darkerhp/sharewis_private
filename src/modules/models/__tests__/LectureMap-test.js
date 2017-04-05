/* eslint-disable no-undef */
import { lectures } from '../../../lib/dummyData';

import Lecture from '../Lecture';
import LectureMap from '../LectureMap';

jest.mock('bugsnag-react-native', () => 'Bugsnag');

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

  it('should return only courseId lectures', () => {
    const lectureMap = new LectureMap(lectures).map(lecture => new Lecture(lecture));
    expect(lectureMap.byCourseId(999).size).toEqual(1);
  });
});
