// @flow
export const totalLectureCount = course =>
  course.lectures.filter(l => l.kind === 'lecture').length;

export const completeLectureCount = course =>
  course.lectures.filter(l => l.isCompleted).length;

export const totalDuration = course =>
  course.lectures.map(l => l.duration || 0).reduce((a, b) => a + b);

export const getNextVideoLecture = (course, ignoreCompleted = true) => {
  const filteredLecture = course.lectures
    .filter(l =>
      l.kind === 'lecture' && l.type === 'VideoLecture' && l.isCompleted === !ignoreCompleted
    ).sort((a, b) => {
      if (a.order === b.order) return 0;
      return a.order < b.order ? -1 : 1;
    });
  return filteredLecture[0] || {};
};

export const getLectureById = (course, lectureId) => {
  return course.lectures.filter(l => l.kind === 'lecture').find((lecture) => lecture.id === lectureId);
};

