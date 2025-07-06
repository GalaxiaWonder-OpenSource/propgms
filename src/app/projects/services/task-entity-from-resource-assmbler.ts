import { TaskResource } from '../resources/task-resource';
import { Task } from '../model/task-entity';

export function TaskEntityFromResourceAssembler(resource: TaskResource): Task {
  return new Task(
    resource.id,
    resource.name,
    resource.description,
    new Date(resource.startDate),
    new Date(resource.endDate),
    resource.milestoneId,
    resource.specialty,
    resource.status,
    resource.personId ?? null
  );
}
