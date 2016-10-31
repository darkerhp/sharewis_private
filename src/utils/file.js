// @flow
import RNFS from 'react-native-fs';

const ARCHIVE_PATH = `${RNFS.DocumentDirectoryPath}/archive`;

export const getCourseArchivePath = courseId =>
  `${ARCHIVE_PATH}/${courseId}`;

export const getCourseVideosDirPath = courseId =>
  `${getCourseArchivePath(courseId)}/videos`;

// ARCHIVE_PATH/archive/{course_id}/videos/{lecture_id}.mp4
export const createVideoFileName = (lectureId, courseId) =>
  `${getCourseVideosDirPath(courseId)}/${lectureId}.mp4`;

export const exists = path => RNFS.exists(path);

const getFileExtension = (fileName) => {
  const f = fileName.split('.');
  return f[f.length - 1].toLowerCase();
};

export async function hasVideoByCourse(courseId) {
  try {
    const courseVideoDirPath = getCourseVideosDirPath(courseId);
    const isExists = await exists(courseVideoDirPath);
    if (!isExists) return false;
    const readDirItemResults = await RNFS.readDir(courseVideoDirPath);
    return readDirItemResults.some(
      readDirItem => getFileExtension(readDirItem.name) === 'mp4'
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
