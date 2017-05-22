import { OrderedMap } from 'immutable';
import Lecture from './Lecture';

const LectureMap = OrderedMap;

export default LectureMap;

// ※extendable-immutableを使うとMap同士のmerge時にRecordが上書きされない不具合がある。
// TODO ↑の理由によってextendできないので以下のfunctionをどこかに定義する

/**
 * 次のレクチャーを取得する
 * @param map
 * @param courseId
 * @param skipCompleted
 * @param currentOrder
 * @returns Lecture
 */
export function getNextLecture(
  map: LectureMap,
  courseId: number,
  skipCompleted: boolean = true,
  currentOrder: number = 0,
): Lecture {
  let filteredLectures = map.filter(l => (
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

