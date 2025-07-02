import { UserAccount } from '../model/user-account';
import { SignInResource } from '../resources/sign-in-resource';

export function SignInResourceFromEntityAssembler(account: UserAccount): SignInResource {
  return {
    userName: account.username,
    password: account.password
  };
}
