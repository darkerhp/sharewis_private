import { Record } from 'immutable';

const CourseRecord = Record({
  id: null,
  hasDownloadedLecture: false,
  imageUrl: '',
  lectureCount: null,
  lectureProgress: null,
  title: '',
  type: '',
  ranking: 0,
});

export default class Course extends CourseRecord {
  static TYPE_SNACK = 'SnackCourse';
  static TYPE_PRO = 'ProCourse';

  /**
   * プロコースかどうか
   * @returns {boolean}
   */
  isProCourse(): boolean {
    return this.type === Course.TYPE_PRO;
  }

  /**
   * スナックコースかどうか
   * @returns {boolean}
   */
  isSnackCourse(): boolean {
    return this.type === Course.TYPE_SNACK;
  }
}
