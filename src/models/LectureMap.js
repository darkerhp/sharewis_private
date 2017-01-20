/**
 * @flow
 */
import { OrderedMap } from 'extendable-immutable';
import Lecture from './Lecture';

export default class LectureMap extends OrderedMap {
  static isLectureMap(value) {
    return value && value instanceof LectureMap;
  }

  /**
   * 次のレクチャーを取得する
   * @param courseId
   * @param skipCompleted
   * @param currentOrder
   * @returns Lecture
   */
  getNextLecture(
    courseId: number,
    skipCompleted: boolean = true,
    currentOrder: number = 0,
  ): Lecture {
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

  /**
   * 最終レクチャーのIDを取得する
   * @param courseId
   * @return レクチャーID
   */
  getLastLectureId(courseId: number): number {
    const videoLectures = this.filter(l => (
      l.courseId === courseId &&
      l.isLecture() &&
      (l.isVideo() || l.isText()) // TODO 今のところ動画とテキストだけ
    ));

    return videoLectures.sortBy(l => l.order).last().id;
  }

  /**
   * コースIDでフィルタリング
   * @param courseId
   * @return LectureMap
   */
  byCourseId(courseId: number): LectureMap {
    return this.filter(l => l.courseId === courseId);
  }
}
