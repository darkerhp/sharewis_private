/* @flow */
import * as types from '../constants/ActionTypes';


export const pressPlay = () => ({
  type: types.PRESS_PLAY,
});
export const pressSpeed = () => ({
  type: types.PRESS_SPEED,
});
export const pressFullScreen = () => ({
  type: types.PRESS_FULL_SCREEN,
});
export const videoProgress = currentTime => ({
  type: types.VIDEO_PROGRESS,
  currentTime,
});
export const loadLecture = (course, lectureId) => ({
  type: types.LOAD_LECTURE,
  course,
  lectureId,
});

export const pressNextLecture = (currentCourse, lectureId) => {
  const newLectures = currentCourse.lectures.map(l => (
    l.id !== lectureId ? l : { ...l, isCompleted: true }
  ));
  const course = {
    ...currentCourse,
    lectures: [...newLectures],
    lecture_progress: currentCourse.lecture_progress + 1,
  };

  return {
    type: types.PRESS_NEXT_LECTURE,
    course,
    lectureId,
  };
};
