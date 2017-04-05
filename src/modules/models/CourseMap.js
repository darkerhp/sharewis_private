import { OrderedMap } from 'extendable-immutable';

export default class CourseMap extends OrderedMap {
  static isCourseMap(value) {
    return value && value instanceof CourseMap;
  }

  getSnackCourses() {
    return this.filter(c => c.type === 'SnackCourse');
  }

  getProCourses() {
    return this.filter(c => c.type === 'ProCourse');
  }

  sortByRanking() {
    return this.sortBy(c => c.ranking);
  }
}
