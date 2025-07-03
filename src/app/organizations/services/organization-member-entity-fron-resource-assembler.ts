import { OrganizationMemberResource } from '../resources/organization-member-resource';
import { OrganizationMember } from '../model/organization-member-entity';

export function OrganizationMemberFromResourceAssembler(
  resource: OrganizationMemberResource
): OrganizationMember {
  return new OrganizationMember(
    resource.id,
    resource.fullName,
    resource.memberType,
    new Date(resource.joinedAt)
  );
}
