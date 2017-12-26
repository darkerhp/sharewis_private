import { Record } from 'immutable';

const CourseRecord = Record({
  id: 0,
  hasDownloadedLecture: false,
  imageUrl: '',
  lectureCount: 0,
  lectureProgress: 0,
  title: '',
  type: '',
  ranking: 0,
  viewedAt: '',
  // for products
  isPurchased: false
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
