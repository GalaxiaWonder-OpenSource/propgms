export interface CreateTaskResource {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  milestoneId: number;
  specialty: string;
  status?: string | null;
  personId?: number | null;
}
