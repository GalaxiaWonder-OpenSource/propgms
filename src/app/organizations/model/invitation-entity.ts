import {InvitationStatus} from './invitation-status';

export class Invitation {
  constructor(
    public id: number,
    public organizationName: string | null,
    public invitedBy: string | null,
    public status: InvitationStatus,
    public invitedAt: Date,
    public invitedPerson: string | null
  ) {}
}
