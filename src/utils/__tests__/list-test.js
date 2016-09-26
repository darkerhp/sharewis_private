/* eslint-disable no-undef */
import replaceInList from '../list';
import { lectures } from '../../data/dummyData';

describe('List Utils', () => {
  it('can update an object in a list based on its id', () => {
    expect(lectures[10].isCompleted).toEqual(false);
    const lecture = {
      ...lectures[10],
      isCompleted: true,
    };
    expect(lecture.id).toEqual(8);

    const updatedLectures = replaceInList(lectures, lecture);

    expect(updatedLectures[10].isCompleted).toEqual(true);
  });

  it('cannot update a list if passed object has no id', () => {
    expect(lectures[0].id).toBeUndefined();
    const lecture = {
      ...lectures[0],
      isCompleted: true,
    };

    const updatedLectures = replaceInList(lectures, lecture);

    expect(updatedLectures[0].isCompleted).toBeUndefined();
  });
});
