export interface SignUpResource {
  userName: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  professionalId?: string | null;
  specialty?: string | null;
}
