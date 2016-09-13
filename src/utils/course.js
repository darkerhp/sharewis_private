// @flow
export const totalLectureCount = (course) =>
  course.lectures.filter(l => l.kind === 'lecture').length;

export const completeLectureCount = (course) =>
  course.lectures.filter(l => l.isCompleted).length;

export const totalDuration = (course) =>
  course.lectures.map(l => l.duration || 0).reduce((a, b) => a + b);

