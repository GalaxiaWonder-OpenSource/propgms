import { MilestoneResource } from '../resources/milestone-resource';
import { Milestone } from '../model/milestone-entity';

export function MilestoneEntityFromResourceAssembler(resource: MilestoneResource): Milestone {
  return new Milestone(
    resource.id,
    resource.name,
    resource.description,
    resource.projectId,
    new Date(resource.startDate),
    new Date(resource.endDate)
  );
}
