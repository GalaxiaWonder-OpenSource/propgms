import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {EndpointConfig, HttpMethod} from '../../shared/model/endpoint-config';
import {dynamicServiceFactory} from '../../shared/utils/dynamic-service-factory';
import {InvitationResource} from '../resources/invitation-resource';
import {Observable} from 'rxjs';
import {InviteToOrganizationResource} from '../resources/invite-to-organization-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.invitationPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'getByPersonId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}${resourcePath}/by-person-id/{id}`,
    requiresAuth: true
  },
  {
    name: 'acceptInvitationById',
    method: HttpMethod.PATCH,
    url: `${apiBaseUrl}${resourcePath}/{id}/accept`,
    requiresAuth: true
  },
  {
    name: 'rejectInvitationById',
    method: HttpMethod.PATCH,
    url: `${apiBaseUrl}${resourcePath}/{id}/reject`,
    requiresAuth: true
  },
  {
    name: 'getByOrganizationId',
    method: HttpMethod.GET,
    url: `${apiBaseUrl}/organizations/{id}/invitations`,
    requiresAuth: true
  },
  {
    name: 'inviteByPersonEmailAndOrganizationId',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}`,
    requiresAuth: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  constructor() { }

  getByPersonId(id: number): Observable<InvitationResource[]> {
    return this.api["getByPersonId"]({}, { id });
  }

  acceptInvitationById(id: number): Observable<InvitationResource> {
    return this.api["acceptInvitationById"]({}, { id });
  }

  rejectInvitationById(id: number): Observable<InvitationResource> {
    return this.api["rejectInvitationById"]({}, { id });
  }

  getByOrganizationId(id: number): Observable<InvitationResource[]> {
    return this.api["getByOrganizationId"]({}, { id });
  }

  inviteByPersonEmailAndOrganizationId(resource: InviteToOrganizationResource): Observable<InvitationResource> {
    return this.api["inviteByPersonEmailAndOrganizationId"](resource);
  }
}
