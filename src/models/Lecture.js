import { Record } from 'immutable';

const LectureRecord = Record({
  id: 0,
  courseId: 0,
  estimatedTime: 0,
  kind: '', // lecture or section
  order: 0,
  status: '',
  title: '',
  type: '',
  // For VideoLecture
  videoUrl: '',
  thumbnailUrl: '',
  hasVideoInDevice: false,
  isDownloading: false,
  jobId: -1,
  progress: 0,

});

export default class Lecture extends LectureRecord {
  // FIXME スケルトン
  getHoge() {
    return this.get('hoge') || 'New Hoge';
  }
}
