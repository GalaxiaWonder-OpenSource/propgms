export class Milestone {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public projectId: number,
    public startDate: Date,
    public endDate: Date
  ) {}
}
