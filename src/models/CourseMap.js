import { Record } from 'immutable';

const CourseRecord = Record({
  id: null,
  text: '',
  completed: false,
});

export default class Course extends CourseRecord {
  getText() {
    return this.get('text') || 'New ToDo';
  }
}
