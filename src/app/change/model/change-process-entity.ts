import { ChangeProcessStatus } from './change-process-status';

export class ChangeProcess {
  constructor(
    public origin: string,
    public status: ChangeProcessStatus,
    public justification: string,
    public projectId: number,
    public response?: string | null
  ) {}

  updateStatus(newStatus: ChangeProcessStatus): void {
    this.status = newStatus;
  }
}
