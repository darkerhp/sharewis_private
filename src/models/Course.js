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
  // TODO 実装する
  hasVideo() {
    return this.get('hoge') || 'New Hoge';
  }
}
