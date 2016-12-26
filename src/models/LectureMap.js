import { OrderedMap } from 'extendable-immutable';

export default class LectureMap extends OrderedMap {
  static isLectureMap(value) {
    return value && value instanceof LectureMap;
  }

  getNextLecture(courseId, skipCompleted = true, currentOrder = 0) {
    let filteredLectures = this.filter(l => (
      l.courseId === courseId &&
      l.isLecture() &&
      (l.isVideo() || l.isText()) && // TODO 今のところ動画とテキストだけ
      l.order > currentOrder
    ));
    if (skipCompleted) {
      filteredLectures = filteredLectures.filterNot(l => l.isFinished());
    }
    return filteredLectures.sortBy(l => l.order).first() || null;
  }

  getLastLectureId(courseId) {
    const videoLectures = this.filter(l => (
      l.courseId === courseId &&
      l.isLecture() &&
      (l.isVideo() || l.isText()) // TODO 今のところ動画とテキストだけ
    ));

    return videoLectures.sortBy(l => l.order).last().id;
  }

}
