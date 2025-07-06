export interface CreateMilestoneResource {
  name: string;
  description: string;
  projectId: number;
  startDate: Date;
  endDate: string;
}
