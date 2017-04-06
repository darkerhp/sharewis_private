import { Schema, arrayOf } from 'normalizr';

export const course = new Schema('courses');
export const lecture = new Schema('lectures');
export const section = new Schema('sections');

export const arrayOfCourses = arrayOf(course);
export const arrayOfLectures = arrayOf(lecture);
export const arrayOfSections = arrayOf(section);