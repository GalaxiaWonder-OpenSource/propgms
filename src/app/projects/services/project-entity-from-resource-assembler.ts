import { ProjectResource } from '../resources/project-resource';
import { Project } from '../model/project-entity';
import { ProjectStatus } from '../model/project-status';

export function ProjectEntityFromResourceAssembler(resource: ProjectResource): Project {
  const statusEnumValue = ProjectStatus[resource.status as keyof typeof ProjectStatus];

  return new Project(
    resource.id,
    resource.projectName,
    resource.description,
    statusEnumValue,
    new Date(resource.startDate),
    new Date(resource.endDate),
    resource.organizationId,
    resource.contractingEntityId
  );
}
