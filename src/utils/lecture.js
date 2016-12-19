export const getNextVideoLecture = (courseId, lectures, skipCompleted = true, currentOrder = 0) => {
  let videoLectures = lectures.filter(l => (
    l.courseId === courseId &&
    l.isLecture() &&
    (l.isVideo() || l.isText()) &&
    l.order > currentOrder
  ));
  if (skipCompleted) {
    videoLectures = videoLectures.filterNot(l => l.isFinished());
  }
  return videoLectures.sortBy(l => l.order).first() || null;
};

export const getLastLectureId = (courseId, lectures) => {
  const videoLectures = lectures.filter(l => (
    l.courseId === courseId &&
    l.isLecture() &&
    (l.isVideo() || l.isText())
  ));

  return videoLectures.sortBy(l => l.order).last().id;
};
