import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndpointConfig, HttpMethod } from '../../shared/model/endpoint-config';
import { dynamicServiceFactory } from '../../shared/utils/dynamic-service-factory';
import { ProjectResource } from '../resources/project-resource';
import {CreateProjectResource} from '../resources/create-project-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.projectPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'getByTeamMemberPersonId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/by-team-member-person-id/{id}`,
    requiresAuth: true
  },
  {
    name: 'createProject',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}`,
    requiresAuth: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() {}

  getByTeamMemberPersonId(id: number): Observable<ProjectResource[]> {
    return this.api['getByTeamMemberPersonId']({}, { id });
  }

  createProject(resource: CreateProjectResource): Observable<ProjectResource> {
    return this.api['createProject'](resource);
  }
}
