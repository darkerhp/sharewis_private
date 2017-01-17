import { Record } from 'immutable';

const CourseRecord = Record({
  id: null,
  hasDownloadedLecture: false,
  imageUrl: '',
  lectureCount: null,
  lectureProgress: null,
  title: '',
  type: '',
});

export default class Course extends CourseRecord {
  // TODO 実装する
  hasVideo() {
    return this.get('hoge') || 'New Hoge';
  }
}
