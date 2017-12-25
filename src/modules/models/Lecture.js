/**
 * @flow
 */
import { Record } from 'immutable';

import * as FileUtils from '../../utils/file';

const LectureRecord = Record({
  id: 0,
  courseId: 0,
  estimatedTime: 0,
  kind: '', // lecture or section or snack
  order: 0,
  status: '',
  title: '',
  type: '',
  isDownloaded: false,
  // For VideoLecture
  videoUrl: '',
  thumbnailUrl: '',
  // For TextLecture
  body: '',
  // For AudioLecture
  audioUrl: '',
  // For downloading TODO
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
   * 動画URLを取得する
   * デバイスに保存してある場合、ファイルパスを返却する
   * @returns {string}
   */
  getVideoUrl(): string {
    if (this.isDownloaded) {
      return `file://${FileUtils.createVideoFileName(this.id, this.courseId)}`;
    }
    return this.videoUrl;
  }

  /**
   * 音声ファイルのURLを取得する
   * デバイスに保存してある場合、ファイルパスを返却する
   * @returns {string}
   */
  getAudioUrl(): string {
    if (this.isDownloaded) {
      return `file://${FileUtils.createAudioFileName(this.id, this.courseId)}`;
    }
    return this.audioUrl;
  }

  /**
   * 添付ファイル名(パス)を取得する
   * @returns {*}
   */
  getAttachmentFileName(): string {
    switch (this.type) {
      case Lecture.TYPE_VIDEO:
        return FileUtils.createVideoFileName(this.id, this.courseId);
      case Lecture.TYPE_AUDIO:
        return FileUtils.createAudioFileName(this.id, this.courseId);
      default:
        return null;
    }
  }

  /**
   * 添付ファイルのURLを取得する
   * @returns {*}
   */
  getAttachmentUrl(): string {
    switch (this.type) {
      case Lecture.TYPE_VIDEO:
        return this.getVideoUrl();
      case Lecture.TYPE_AUDIO:
        return this.getAudioUrl();
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
    if (!this.isViewable()) return false;

    switch (this.type) {
      case Lecture.TYPE_VIDEO:
      case Lecture.TYPE_AUDIO:
        return isOnline || this.isDownloaded;
      default:
        return isOnline;
    }
  }

  /**
   * アプリで閲覧可能なレクチャーかどうか
   * @returns {boolean}
   */
  isViewable(): boolean {
    switch (this.type) {
      case Lecture.TYPE_VIDEO:
      case Lecture.TYPE_AUDIO:
      case Lecture.TYPE_TEXT:
        return true;
      case Lecture.TYPE_QUIZ:
      case Lecture.TYPE_PDF:
      case Lecture.TYPE_ATTACHMENT:
      default:
        return false;
    }
  }

  /**
   * ダウンロード可能なレクチャーかどうか
   * @returns {boolean}
   */
  isDownloadable(): boolean {
    switch (this.type) {
      case Lecture.TYPE_VIDEO:
      case Lecture.TYPE_AUDIO:
        return true;
      case Lecture.TYPE_TEXT:
      case Lecture.TYPE_QUIZ:
      case Lecture.TYPE_PDF:
      case Lecture.TYPE_ATTACHMENT:
      default:
        return false;
    }
  }

  /**
   * レクチャーが開始済みかどうか
   * @returns {boolean}
   */
  isNotStarted(): boolean {
    return this.status === Lecture.STATUS_NOT_STARTED;
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
