import {Injectable} from '@angular/core';
import {EndpointConfig, HttpMethod} from '../../shared/model/endpoint-config';
import {dynamicServiceFactory} from '../../shared/utils/dynamic-service-factory';
import {environment} from "../../../environments/environment";
import {OrganizationMemberResource} from "../resources/organization-member-resource";
import {Observable} from "rxjs";

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.organizationMembersPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'getByOrganizationId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/{id}/members`,
    requiresAuth: true
  },
  {
    name: 'removeByOrganizationMemberId',
    method: HttpMethod.DELETE,
    url: `${apiBaseUrl}${resourcePath}/members/{id}`,
    requiresAuth: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class OrganizationMemberService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() {}

  getByOrganizationId(id: number): Observable<OrganizationMemberResource[]> {
    return this.api["getByOrganizationId"]({}, {id})
  }

  removeByOrganizationMemberId(id: number): Observable<any> {
    return this.api["removeByOrganizationMemberId"]({}, {id})
  }
}
