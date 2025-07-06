export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public milestoneId: number,
    public specialty: string,
    public status: string,
    public personId?: number | null
  ) {
  }
}
