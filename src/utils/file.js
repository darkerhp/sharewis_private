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
