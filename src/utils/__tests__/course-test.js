/* eslint-disable no-undef */
import * as CourseUtils from '../course';

// Test Data
const course = {
  title: '差がつくビジネス戦略講座 | 事業開発・Platform戦略(R)・ITマーケティング',
  lectures: [
    { title: 'セクション１', kind: 'section' },
    {
      order: 1,
      title: 'レクチャーA',
      kind: 'lecture',
      duration: 30,
      isCompleted: true,
      type: 'VideoLecture',
    },
    {
      order: 2,
      title: 'レクチャーB',
      kind: 'lecture',
      duration: 60,
      isCompleted: false,
      type: 'TextLecture',
    },
    {
      order: 3,
      title: 'レクチャーC',
      kind: 'lecture',
      duration: 90,
      isCompleted: false,
      type: 'VideoLecture',
    },
  ],
};

describe('Course Utils', () => {
  it('should return totalLectureCount', () =>
    expect(CourseUtils.totalLectureCount(course)).toEqual(3)
  );

  it('should return completeLectureCount', () =>
    expect(CourseUtils.completeLectureCount(course)).toEqual(1)
  );

  it('should return totalDuration', () =>
    expect(CourseUtils.totalDuration(course)).toEqual(180)
  );

  it('should return next lecture', () => {
    nextLecture = CourseUtils.getNextLecture(course);
    expect(nextLecture.order).toEqual(3);
  });
});
