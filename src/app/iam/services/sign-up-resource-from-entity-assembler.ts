import { SignUpResource} from '../resources/sign-up-resource';
import { Person } from '../model/person';
import { UserAccount } from '../model/user-account';

export function SignUpResourceFromEntityAssembler(person: Person, account: UserAccount): SignUpResource {
  return {
    userName: account.username,
    password: account.password,
    userType: account.type,
    firstName: person.firstname,
    lastName: person.lastname,
    email: person.email,
    phone: person.phone || null,
    professionalId: person.professionalId || null
  };
}
