import { schema } from 'normalizr';

export const course = new schema.Entity('courses');
export const lecture = new schema.Entity('lectures');
export const section = new schema.Entity('sections');
export const product = new schema.Entity('products');

export const arrayOfCourses = new schema.Array(course);
export const arrayOfLectures = new schema.Array(lecture);
export const arrayOfSections = new schema.Array(section);
export const arrayOfProducts = new schema.Array(product);
