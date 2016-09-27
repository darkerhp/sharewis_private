/* eslint-disable no-undef */
import replaceInList from '../list';
import { lectures } from '../../data/dummyData';

describe('List Utils', () => {
  it('can update an object in a list based on its id', () => {
    expect(lectures[10].status).toEqual(false);
    const lecture = {
      ...lectures[10],
      status: 'finished',
    };
    expect(lecture.id).toEqual(8);

    const updatedLectures = replaceInList(lectures, lecture);

    expect(updatedLectures[10].status).toEqual(true);
  });

  it('cannot update a list if passed object has no id', () => {
    expect(lectures[0].id).toBeUndefined();
    const lecture = {
      ...lectures[0],
      status: 'finished',
    };

    const updatedLectures = replaceInList(lectures, lecture);

    expect(updatedLectures[0].status).toBeUndefined();
  });
});
