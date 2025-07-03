import {OrganizationMemberType} from './organization-member-type';
import {OrganizationStatus} from './organization-status';

export class Organization {
  // Display only fields, not inherently from the domain model
  public currentUsersRole: OrganizationMemberType | undefined

  constructor(
    public id: number,
    public legalName: string,
    public commercialName: string,
    public ruc: string,
    public createdBy: number,
    public status: OrganizationStatus,
    public createdAt: Date,
  ) {}

  updateLegalName(newLegalName: string): void {
    if (!newLegalName.trim()) {
      throw new Error('Legal name cannot be empty.');
    }
    this.legalName = newLegalName;
  }

  updateCommercialName(newCommercialName: string): void {
    if (!newCommercialName.trim()) {
      throw new Error('Commercial name cannot be empty.');
    }
    this.commercialName = newCommercialName;
  }
}

