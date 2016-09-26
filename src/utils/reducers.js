import replaceInList from './list';


// Returns state.currentCourse
export const loadCurrentLecture = (currentCourse, action) => {
  const currentLecture = action.currentLecture;
  const lectures = replaceInList(currentCourse.lectures, currentLecture);
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
    isCompleted: true,
  };
  const lectures = replaceInList(currentCourse.lectures, currentLecture);
  return {
    ...currentCourse,
    lectures,
    currentLecture,
    lectureProgress: currentCourse.lectureProgress + 1,
  };
};


// Return state
export const updateCurrentCourse = (state, currentCourse) => {
  const courses = replaceInList(state.courses, currentCourse);
  return { ...state, courses, currentCourse };
};
