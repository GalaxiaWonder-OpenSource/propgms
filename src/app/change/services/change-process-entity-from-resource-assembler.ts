import { ChangeProcessResource } from '../resources/change-process-resource';
import { ChangeProcess } from '../model/change-process-entity';
import { ChangeProcessStatus } from '../model/change-process-status';

export function ChangeProcessEntityFromResourceAssembler(resource: ChangeProcessResource): ChangeProcess {
  return new ChangeProcess(
    resource.origin,
    ChangeProcessStatus[resource.status as keyof typeof ChangeProcessStatus],
    resource.justification,
    resource.projectId,
    resource.response ?? null
  );
}
