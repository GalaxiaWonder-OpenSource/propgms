import { Routes } from '@angular/router';

import {AuthenticationLayout} from './iam/layouts/authentication-layout/authentication-layout';
import {RegisterTab} from './iam/tabs/register-tab/register-tab';
import {LoginTab} from './iam/tabs/login-tab/login-tab';

import {WorkerDashboardLayout} from './organizations/layouts/organization-layout/worker-dashboard-layout.component';
import {OrganizationsTab} from './organizations/tabs/organizations-tab/organizations-tab';
import {InvitationsTab} from './organizations/tabs/invitations-tab/invitations-tab';

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
    path: 'worker',
    component: WorkerDashboardLayout,
    children: [
      { path: '', redirectTo: 'organizations', pathMatch: 'full' },
      { path: 'organizations', component: OrganizationsTab },
      { path: 'invitations', component: InvitationsTab }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
