/* eslint-disable no-undef */
import {
  sectionsSelector,
  lecturesSelector,
  viewableLecturesSelector,
  getSectionMergedLectureList,
  getLectureProgress,
  getLectureTotalDuration,
  getNextNotCompletedLecture,
  getNextLecture,
  getLastLectureId,
} from '../../selectors/lectureSelectors';

import Lecture from '../../models/Lecture';
import LectureMap from '../../models/LectureMap';

jest.mock('bugsnag-react-native', () => 'Bugsnag');

const factory = lectures => new LectureMap(lectures).map(lecture => new Lecture(lecture));

describe('lectureSelectors', () => {
  it('sectionsSelector should return sections', () => {
    const sections = factory({
      1: { id: 1, kind: 'section', courseId: 1 },
      2: { id: 2, kind: 'section', courseId: 2 },
    });

    const selectedSections = sectionsSelector({}, { currentCourseId: 1, sections });
    expect(selectedSections.size).toEqual(1);
  });

  it('lecturesSelector should return lectures', () => {
    const lectures = factory({
      1: { id: 1, kind: 'lecture', courseId: 1 },
      2: { id: 2, kind: 'lecture', courseId: 2 },
    });

    const selectedLectures = lecturesSelector({}, { currentCourseId: 1, lectures });
    expect(selectedLectures.size).toEqual(1);
  });

  it('viewableLecturesSelector should return viewable lectures', () => {
    const lectures = factory({
      1: { id: 1, type: 'video' },
      2: { id: 2, type: 'text' },
      3: { id: 3, type: 'pdf' },
      4: { id: 4, type: 'audio' },
    });

    const viewableLectures = viewableLecturesSelector.resultFunc(lectures);
    expect(viewableLectures.size).toEqual(2);
  });

  it('getSectionMergedLectureList should return section merged lectures', () => {
    const sections = factory({ 101: { id: 101, order: 1 }, 102: { id: 102, order: 4 } });

    const lectures = factory({
      901: { id: 901, order: 2 },
      902: { id: 902, order: 3 },
      903: { id: 903, order: 5 },
    });

    const mergedLectures = getSectionMergedLectureList.resultFunc(sections, lectures);
    console.log(mergedLectures);
    expect(mergedLectures.size).toEqual(5);
    expect(mergedLectures.first().id).toEqual(101);
    expect(mergedLectures.last().id).toEqual(903);
  });

  it('getLectureProgress', () => {
    const lectures = factory({
      1: { id: 1, status: 'finished' },
      2: { id: 2, status: 'finished' },
      3: { id: 3, status: 'viewed' },
      4: { id: 4, status: 'not_started' },
    });

    const lectureProgress = getLectureProgress.resultFunc(lectures);
    expect(lectureProgress).toEqual(2);
  });

  it('getLectureTotalDuration', () => {
    const lectures = factory({ 1: { id: 1, estimatedTime: 3 }, 2: { id: 2, estimatedTime: 6 } });

    const totalDuration = getLectureTotalDuration.resultFunc(lectures);
    expect(totalDuration).toEqual(9);
  });

  it('getNextNotCompletedLecture', () => {
    const lectures = factory({
      1: { id: 1, order: 1, status: 'finished' },
      2: { id: 2, order: 2, status: 'not_started' },
      3: { id: 3, order: 3, status: 'not_started' },
    });

    const nextLecture = getNextNotCompletedLecture.resultFunc(lectures);

    expect(nextLecture.id).toEqual(2);
  });

  it('getNextLecture', () => {
    const lectures = factory({
      1: { id: 1, order: 1, status: 'finished' },
      2: { id: 2, order: 2, status: 'not_started' },
      3: { id: 3, order: 3, status: 'not_started' },
    });

    const nextLecture = getNextLecture.resultFunc(lectures, 0);

    expect(nextLecture.id).toEqual(1);
  });

  it('getLastLectureId should return last lectureId', () => {
    const lectures = factory({
      1: { id: 1, order: 3 },
      2: { id: 2, order: 2 },
      3: { id: 3, order: 1 },
    });

    const lastLectureId = getLastLectureId.resultFunc(lectures);
    expect(lastLectureId).toEqual(1);
  });
});
