export interface CreateProjectResource {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  organizationId: number;
  contractingEntityEmail: string;
}
