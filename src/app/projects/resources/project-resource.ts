export interface ProjectResource {
  id: number;
  projectName: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  organizationId: number;
  contractingEntityId: number;
}
