import { Injectable } from '@angular/core';
import { dynamicServiceFactory } from '../../shared/utils/dynamic-service-factory';
import { EndpointConfig, HttpMethod } from '../../shared/model/endpoint-config';
import { environment } from '../../../environments/environment';
import {UserAccountResource} from '../resources/user-account-resource';
import {Observable} from 'rxjs';
import {SignUpResource} from '../resources/sign-up-resource';
import {SignInResponseResource} from '../resources/sign-in-response-resource';
import {SignInResource} from '../resources/sign-in-resource';

const apiBaseUrl = environment.serverBaseUrl;
const resourcePath = environment.authorizationPath;

const endpoints: EndpointConfig[] = [
  {
    name: 'signup',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}/signup`,
    requiresAuth: false
  },
  {
    name: 'signin',
    method: HttpMethod.POST,
    url: `${apiBaseUrl}${resourcePath}/signin`,
    requiresAuth: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly api = dynamicServiceFactory<any>(endpoints);

  signUp(data: SignUpResource): Observable<UserAccountResource> {
    return this.api["signup"](data);
  }

  signIn(data: SignInResource):Observable<SignInResponseResource> {
    return this.api["signin"](data);
  }
}

