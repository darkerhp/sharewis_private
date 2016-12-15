import { Record } from 'immutable';

const CourseRecord = Record({
  id: null,
  imageUrl: '',
  lectureCount: null,
  lectureProgress: null,
  title: '',
  hasDownloadedLecture: false,
});

export default class Course extends CourseRecord {
  // FIXME スケルトン
  getHoge() {
    return this.get('hoge') || 'New Hoge';
  }
}
