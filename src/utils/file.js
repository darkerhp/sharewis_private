import RNFS from 'react-native-fs';
import { Client } from 'bugsnag-react-native';

const ARCHIVE_PATH = `${RNFS.DocumentDirectoryPath}/archive`;

export const getCourseArchivePath = courseId =>
  `${ARCHIVE_PATH}/${courseId}`;

export const getCourseDownloadDirPath = courseId =>
  `${getCourseArchivePath(courseId)}/videos`; // FIXME ダウンロード対象が動画だけだった頃の名残でディレクトリ名がvideosとなっている

// ARCHIVE_PATH/archive/{course_id}/videos/{lecture_id}.mp4
export const createVideoFileName = (lectureId, courseId) =>
  `${getCourseDownloadDirPath(courseId)}/${lectureId}.mp4`; // FIXME mp4決め打ち

export const createAudioFileName = (lectureId, courseId) =>
  `${getCourseDownloadDirPath(courseId)}/${lectureId}.mp3`; // FIXME mp3決め打ち

export const exists = path => RNFS.exists(path);

const getFileExtension = (fileName) => {
  const f = fileName.split('.');
  return f[f.length - 1].toLowerCase();
};

export async function hasDownloadLectureByCourse(courseId) {
  try {
    const courseDownloadDirPath = getCourseDownloadDirPath(courseId);
    const isExists = await exists(courseDownloadDirPath);
    if (!isExists) return false;
    const readDirItemResults = await RNFS.readDir(courseDownloadDirPath);
    return readDirItemResults.some((readDirItem) => {
      const fileExt = getFileExtension(readDirItem.name);
      return fileExt === 'mp4' || fileExt === 'mp3';
    });
  } catch (error) {
    new Client().notify(error);
    console.error(error);
    throw error;
  }
}
