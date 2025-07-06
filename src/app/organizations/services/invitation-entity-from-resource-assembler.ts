import { InvitationResource } from '../resources/invitation-resource';
import { Invitation } from '../model/invitation-entity';
import { InvitationStatus } from '../model/invitation-status';

export function InvitationEntityFromResourceAssembler(resource: InvitationResource): Invitation {
  return new Invitation(
    resource.id,
    resource.organizationName ?? null,
    resource.invitedBy ?? null,
    InvitationStatus[resource.status as keyof typeof InvitationStatus], // Cast to enum
    new Date(resource.invitedAt),
    resource.invitedPerson ?? null
  );
}

