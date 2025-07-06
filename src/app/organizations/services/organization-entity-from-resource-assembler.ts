import { OrganizationResource } from '../resources/organization-resource';
import { Organization } from '../model/organization-entity';
import { OrganizationMemberType } from '../model/organization-member-type';
import { OrganizationStatus } from '../model/organization-status';

export function OrganizationEntityFromResourceAssembler(
  resource: OrganizationResource,
  currentPersonId: number
): Organization {
  const statusEnumValue = OrganizationStatus[resource.status as keyof typeof OrganizationStatus];

  const organization = new Organization(
    resource.id,
    resource.legalName,
    resource.commercialName,
    resource.ruc,
    resource.createdBy,
    statusEnumValue,
    resource.createdAt
  );

  organization.currentUsersRole =
    resource.createdBy === currentPersonId
      ? OrganizationMemberType.CONTRACTOR
      : OrganizationMemberType.WORKER;

  return organization;
}
