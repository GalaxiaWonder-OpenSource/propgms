import { Routes } from '@angular/router';

import {AuthenticationLayout} from './iam/layouts/authentication-layout/authentication-layout';
import {RegisterTab} from './iam/tabs/register-tab/register-tab';
import {LoginTab} from './iam/tabs/login-tab/login-tab';

import {OrganizationLayout} from './organizations/layouts/organization-layout/organization-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginTab },
      { path: 'register', component: RegisterTab },
    ]
  },
  {
    path: 'organizations',
    component: OrganizationLayout
  },
  { path: '**', redirectTo: 'login' }
];
