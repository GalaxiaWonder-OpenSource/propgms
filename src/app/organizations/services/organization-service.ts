import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {EndpointConfig, HttpMethod} from '../../shared/model/endpoint-config';
import {dynamicServiceFactory} from '../../shared/utils/dynamic-service-factory';
import {OrganizationResource} from '../resources/organization-resource';
import {Observable} from 'rxjs';
import {CreateOrganizationResource} from '../../iam/resources/create-organization-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.organizationPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'getByPersonId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/by-person-id/{id}`,
    requiresAuth: true
  },
  {
    name: 'createOrganization',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}`,
    requiresAuth: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() { }

  getByPersonId(id: number): Observable<OrganizationResource[]> {
    return this.api["getByPersonId"]({}, { id });
  }

  createOrganization(resource: CreateOrganizationResource): Observable<OrganizationResource> {
    return this.api["createOrganization"](resource);
  }
}
