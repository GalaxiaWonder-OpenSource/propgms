import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndpointConfig, HttpMethod } from '../../shared/model/endpoint-config';
import { dynamicServiceFactory } from '../../shared/utils/dynamic-service-factory';

import { ChangeProcessResource} from '../resources/change-process-resource';
import { CreateChangeProcessResource } from '../resources/create-change-process-resource';
import { RespondToChangeProcessResource } from '../resources/respond-to-change-process-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.changeProcessPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'createChangeProcess',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}`,
    requiresAuth: true
  },
  {
    name: 'respondToChangeProcess',
    method: HttpMethod.PATCH,
    url: `${apiBaseUrl}${resourcePath}/{changeProcessId}`,
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
export class ChangeProcessService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() {}

  createChangeProcess(resource: CreateChangeProcessResource): Observable<ChangeProcessResource> {
    return this.api["createChangeProcess"](resource);
  }

  respondToChangeProcess(resource: RespondToChangeProcessResource, changeProcessId: number): Observable<ChangeProcessResource> {
    return this.api["respondToChangeProcess"](resource, { changeProcessId });
  }

  getByProjectId(projectId: number): Observable<ChangeProcessResource[]> {
    return this.api["getByProjectId"]({}, { projectId });
  }
}
