/* eslint-disable no-undef */
import totalDuration from '../courseDetails';
import { lectures } from '../../data/dummyData';


describe('Course Utils', () => {
  it('should return totalDuration', () =>
    expect(totalDuration(lectures)).toEqual(1284)
  );
});
