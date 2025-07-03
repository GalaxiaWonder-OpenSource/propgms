export class OrganizationMember {
  id: number;
  fullName: string;
  memberType: string;
  joinedAt: Date;

  constructor(id: number, fullName: string, memberType: string, joinedAt: Date) {
    this.id = id;
    this.fullName = fullName;
    this.memberType = memberType;
    this.joinedAt = joinedAt;
  }
}
