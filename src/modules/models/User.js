import { Record } from 'immutable';

const UserRecord = Record({
  id: null, // TODO 今のstateでuserId
  email: '',
  facebookId: null,
  isPremium: false, // TODO 今のstateで0が入ってる。。。
  loggedIn: false,
  name: '', // TODO 今のstateでuserName
  nickName: '',
  password: ''
});

export default class User extends UserRecord {
  // FIXME スケルトン
  getHoge() {
    return this.get('hoge') || 'New Hoge';
  }
}
