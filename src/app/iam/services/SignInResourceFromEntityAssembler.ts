import { UserAccount } from '../model/user-account';
import { SignInResource } from '../resources/SignInResource';

export function SignInResourceFromEntityAssembler(account: UserAccount): SignInResource {
  return {
    userName: account.username,
    password: account.password
  };
}
