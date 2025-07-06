import {UserAccountType} from './user-account-type';

export class UserAccount {
  constructor(
    public username: string = '',
    public password: string = '',
    public type: UserAccountType,
    public id?: number
  ) {
  }
}
