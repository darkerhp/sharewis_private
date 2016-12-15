import { Record } from 'immutable';

const LectureRecord = Record({
  id: null,
  courseId: null,
  estimatedTime: null,
  kind: '', // lecture or section
  order: null,
  status: '',
  title: '',
  type: '',
  // For VideoLecture
  videoUrl: '',
  thumbnailUrl: '',
  hasVideoInDevice: false,
});

export default class Lecture extends LectureRecord {
  // FIXME スケルトン
  getHoge() {
    return this.get('hoge') || 'New Hoge';
  }
}
