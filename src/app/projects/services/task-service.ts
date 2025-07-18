import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndpointConfig, HttpMethod } from '../../shared/model/endpoint-config';
import { dynamicServiceFactory } from '../../shared/utils/dynamic-service-factory';
import {TaskResource} from '../resources/task-resource';
import {CreateTaskResource} from '../resources/create-task-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.taskPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'getByMilestoneId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/by-milestone-id/{milestoneId}`,
    requiresAuth: true
  },
  {
    name: 'createTask',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}`,
    requiresAuth: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() {}

  getByMilestoneId(milestoneId: number): Observable<TaskResource[]> {
    return this.api['getByMilestoneId']({}, { milestoneId });
  }

  createTask(resource: CreateTaskResource) : Observable<TaskResource> {
    return this.api['createTask'](resource,);
  }
}
