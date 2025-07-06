export interface TaskResource {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  milestoneId: number;
  specialty: string;
  status: string;
  personId?: number | null;
}
