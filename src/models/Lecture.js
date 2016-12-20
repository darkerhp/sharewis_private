/**
 * @flow
 */
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
  static KIND_LECTURE = 'lecture';
  static KIND_SECTION = 'section';
  static TYPE_VIDEO = 'video';
  static TYPE_QUIZ = 'quiz';
  static TYPE_TEXT = 'text';
  static TYPE_PDF = 'pdf';
  static TYPE_ATTACHMENT = 'attachment';
  static TYPE_AUDIO = 'audio';
  static STATUS_NOT_STARTED = 'not_started';
  static STATUS_VIEWED = 'viewed';
  static STATUS_FINISHED = 'finished';

  /**
   * アイコン名を取得する
   * @returns {*}
   */
  getLectureIconName() {
    switch (this.type) {
      case Lecture.TYPE_VIDEO:
        return 'play-circle-filled';
      case Lecture.TYPE_TEXT:
        return 'text-format';
      case Lecture.TYPE_PDF:
        return 'picture-as-pdf';
      case Lecture.TYPE_AUDIO:
        return 'audiotrack';
      case Lecture.TYPE_QUIZ:
        return 'question-answer';
      case Lecture.TYPE_ATTACHMENT:
        return 'attachment';
      default:
        return null;
    }
  }

  /**
   * アクセス可能なレクチャーかどうか
   * @param isOnline
   * @returns {boolean}
   */
  canAccess(isOnline: boolean = true): boolean {
    switch (this.type) {
      case Lecture.TYPE_VIDEO:
        return isOnline || this.hasVideoInDevice;
      case Lecture.TYPE_TEXT:
        break;
      case Lecture.TYPE_QUIZ:
      case Lecture.TYPE_PDF:
      case Lecture.TYPE_ATTACHMENT:
      case Lecture.TYPE_AUDIO:
      default:
        return false;
    }
    return isOnline;
  }

  /**
   * レクチャーが終了済みかどうか
   * @returns {boolean}
   */
  isFinished(): boolean {
    return this.status === Lecture.STATUS_FINISHED;
  }

  /**
   * セクションかどうか
   * @returns {boolean}
   */
  isSection(): boolean {
    return this.kind === Lecture.KIND_SECTION;
  }

  /**
   * レクチャーかどうか
   * @returns {boolean}
   */
  isLecture(): boolean {
    return this.kind === Lecture.KIND_LECTURE;
  }

  /**
   * 動画レクチャーかどうか
   * @returns {boolean}
   */
  isVideo(): boolean {
    return this.type === Lecture.TYPE_VIDEO;
  }

  /**
   * テキストレクチャーかどうか
   * @returns {boolean}
   */
  isText(): boolean {
    return this.type === Lecture.TYPE_TEXT;
  }

  /**
   * クイズレクチャーかどうか
   * @returns {boolean}
   */
  isQuiz(): boolean {
    return this.type === Lecture.TYPE_QUIZ;
  }

  /**
   * PDFレクチャーかどうか
   * @returns {boolean}
   */
  isPdf(): boolean {
    return this.type === Lecture.TYPE_PDF;
  }

  /**
   * 添付レクチャーかどうか
   * @returns {boolean}
   */
  isAttachment(): boolean {
    return this.type === Lecture.TYPE_ATTACHMENT;
  }

  /**
   * 音声レクチャーかどうか
   * @returns {boolean}
   */
  isAudio(): boolean {
    return this.type === Lecture.TYPE_AUDIO;
  }
}
