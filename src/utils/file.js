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

export async function hasVideoByCourse(courseId) {
  const courseVideoDirPath = getCourseVideosDirPath(courseId);
  const isExists = await exists(courseVideoDirPath);
  if (!isExists) return false;
  const readDirItemResult = await RNFS.readDir();
  return readDirItemResult.size > 0;
}
