import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndpointConfig, HttpMethod } from '../../shared/model/endpoint-config';
import { dynamicServiceFactory } from '../../shared/utils/dynamic-service-factory';
import { ProjectResource } from '../resources/project-resource';
import {CreateProjectResource} from '../resources/create-project-resource';
import {GenericMessageResource} from '../../shared/resources/GenericMessageResource';
import {UpdateProjectResource} from '../resources/update-project-resource';

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
  },
  {
    name: 'updateProjectById',
    method: HttpMethod.PATCH,
    url: `${apiBaseUrl}${resourcePath}/{id}`,
    requiresAuth: true
  },
  {
    name: 'deleteProjectById',
    method: HttpMethod.DELETE,
    url: `${apiBaseUrl}${resourcePath}/{id}`,
    requiresAuth: true
  },
  {
    name: 'getByContractingEntityPersonId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/by-contracting-entity-id/{contractingEntityId}`,
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

  updateProjectById(resource: UpdateProjectResource, id: number): Observable<GenericMessageResource> {
    return this.api['updateProjectById'](resource, {id});
  }

  deleteProjectById(id: number): Observable<GenericMessageResource> {
    return this.api['deleteProjectById']({}, { id });
  }

  getByContractingEntityPersonId(contractingEntityId: number): Observable<ProjectResource[]> {
    return this.api["getByContractingEntityPersonId"]({}, { contractingEntityId });
  }
}
