import { Record } from 'immutable';

import * as Const from '../constants/Api';

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
  /**
   * アイコン名を取得する
   * @returns {*}
   */
  getLectureIconName() {
    switch (this.type) {
      case Const.LECTURE_TYPE_VIDEO:
        return 'play-circle-filled';
      case Const.LECTURE_TYPE_TEXT:
        return 'text-format';
      case Const.LECTURE_TYPE_PDF:
        return 'picture-as-pdf';
      case Const.LECTURE_TYPE_AUDIO:
        return 'audiotrack';
      case Const.LECTURE_TYPE_QUIZ:
        return 'question-answer';
      case Const.LECTURE_TYPE_ATTACHMENT:
        return Const.LECTURE_TYPE_ATTACHMENT;
      default:
        return null;
    }
  }
}
