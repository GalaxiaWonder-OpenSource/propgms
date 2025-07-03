import { OrganizationMemberResource } from '../resources/organization-member-resource';
import { OrganizationMember } from '../model/organization-member-entity';

export function OrganizationMemberEntityFromResourceAssembler(
  resource: OrganizationMemberResource
): OrganizationMember {
  return new OrganizationMember(
    resource.id,
    resource.fullName,
    resource.memberType,
    new Date(resource.joinedAt)
  );
}
