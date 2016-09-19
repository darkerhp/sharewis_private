/* eslint-disable no-undef */
/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import * as LectureUtils from '../lecture';

const lectures = [
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
    isCompleted: true,
    type: 'VideoLecture',
  },
  {
    order: 3,
    title: 'レクチャーC',
    kind: 'lecture',
    duration: 60,
    isCompleted: false,
    type: 'TextLecture',
  },
  {
    order: 4,
    title: 'レクチャーD',
    kind: 'lecture',
    duration: 90,
    isCompleted: false,
    type: 'VideoLecture',
  },
];

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
    expect(nextLecture.order).toEqual(4);

    nextLecture = LectureUtils.getNextVideoLecture(lectures, false);
    expect(nextLecture.order).toEqual(1);
  });
});
