// @flow
export const nextLecture = (lectures) => {
  const filteredLecture = lectures
    .filter(l =>
      l.kind === 'lecture' && l.type === 'VideoLecture' && l.isCompleted === false
    ).sort((a, b) => {
      if (a.order === b.order) return 0;
      return a.order < b.order ? -1 : 1;
    });
  return filteredLecture[0] || {};
};

export default nextLecture;
