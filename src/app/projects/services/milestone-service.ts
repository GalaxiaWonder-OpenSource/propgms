import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {EndpointConfig, HttpMethod} from '../../shared/model/endpoint-config';
import { dynamicServiceFactory } from '../../shared/utils/dynamic-service-factory';
import {Observable} from 'rxjs';
import {MilestoneResource} from '../resources/milestone-resource';
import {CreateMilestoneResource} from '../resources/create-milestone-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.milestonePath;

const endpoints: EndpointConfig[] = [
  {
    name: 'createMilestone',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}`,
    requiresAuth: true
  },
  {
    name: 'getByProjectId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/by-project-id/{projectId}`,
    requiresAuth: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() {}

  createMilestone(resource: CreateMilestoneResource): Observable<MilestoneResource> {
    return this.api["createMilestone"](resource);
  }

  getByProjectId(projectId: number): Observable<MilestoneResource[]> {
    return this.api["getByProjectId"]({}, { projectId });
  }
}
