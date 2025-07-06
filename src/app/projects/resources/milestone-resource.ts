export interface MilestoneResource {
  id: number;
  name: string;
  description: string;
  projectId: number;
  startDate: Date;
  endDate: Date;
}
