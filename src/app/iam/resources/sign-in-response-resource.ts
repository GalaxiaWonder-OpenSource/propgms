import { UserAccountResource} from './user-account-resource';

export interface SignInResponseResource {
  user: UserAccountResource;
  token: string;
}
