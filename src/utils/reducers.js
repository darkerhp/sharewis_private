import replaceInList from './list';
import {
  LECTURE_STATUS_NOT_STARTED,
  LECTURE_STATUS_VIEWED,
} from '../constants/Api';


// Returns state.currentCourse
export const loadCurrentLecture = (currentCourse, action) => {
  const currentLecture = {
    ...action.currentLecture,
    status: action.status === LECTURE_STATUS_NOT_STARTED
    ? LECTURE_STATUS_VIEWED
    : action.status,
  };
  let lectures = action.lectures;
  if (currentCourse.lectures) {
    lectures = replaceInList(currentCourse.lectures, currentLecture);
  }
  return {
    ...currentCourse,
    lectures,
    currentLecture,
  };
};

// Returns state.currentCourse
export const completeCurrentLecture = (currentCourse) => {
  const currentLecture = {
    ...currentCourse.currentLecture,
    status: 'finished',
  };
  const lectures = replaceInList(currentCourse.lectures, currentLecture);
  return {
    ...currentCourse,
    lectures,
    currentLecture,
    lectureProgress: currentCourse.lectureProgress + 1,
  };
};

// Returns state.currentCourse
export const fetchCourseDetailsSuccess = (state, { course, lectures }) => ({
  ...state,
  isFetching: false,
  lectureCount: course.lecture_count,
  lectureProgress: course.lecture_progress,
  lectures: lectures.map(
    ({ course_id, estimated_time, video_url, ...lecture }) => ({
      ...lecture,
      courseId: course_id,
      estimatedTime: estimated_time,
      videoUrl: video_url,
    }),
  ),
});


// Return state
export const updateCurrentCourse = (state, currentCourse) => {
  const courses = replaceInList(state.courses, currentCourse);
  return { ...state, courses, currentCourse };
};
