export class Project {
  constructor(
    public id: number,
    public projectName: string,
    public description: string,
    public status: string,
    public startDate: Date,
    public endDate: Date,
    public organizationId: number,
    public contractingEntityId: number
  ) {}
}
