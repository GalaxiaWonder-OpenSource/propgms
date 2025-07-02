export interface InvitationResource {
  id: number;
  organizationName?: string | null;
  invitedBy?: string | null;
  status: string;
  invitedAt: Date;
  invitedPerson?: string | null;
}
