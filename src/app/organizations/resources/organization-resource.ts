export interface OrganizationResource {
  id: number;
  legalName: string;
  commercialName: string;
  ruc: string;
  createdBy: number;
  status: string;
  createdAt: Date;
}
