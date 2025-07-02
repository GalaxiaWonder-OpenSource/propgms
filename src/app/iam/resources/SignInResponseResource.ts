import { UserAccountResource} from './UserAccountResource';

export interface SignInResponseResource {
  user: UserAccountResource;
  token: string;
}
