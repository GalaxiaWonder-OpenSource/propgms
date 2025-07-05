import { Routes } from '@angular/router';

import {AuthenticationLayout} from './iam/layouts/authentication-layout/authentication-layout';
import {RegisterTab} from './iam/tabs/register-tab/register-tab';
import {LoginTab} from './iam/tabs/login-tab/login-tab';

import {WorkerLayout} from './organizations/layouts/worker-layout/worker-layout';
import {OrganizationsTab} from './organizations/tabs/organizations-tab/organizations-tab';
import {InvitationsTab} from './organizations/tabs/invitations-tab/invitations-tab';
import {OrganizationLayout} from './organizations/layouts/organization-layout/organization-layout';
import {OrganizationMemberTab} from './organizations/tabs/organization-member-tab/organization-member-tab';
import {OrganizationSettingsTab} from './organizations/tabs/organization-settings-tab/organization-settings-tab';
import {ProjectsTab} from './projects/tabs/projects-tab/projects-tab';

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
    component: WorkerLayout,
    children: [
      { path: '', redirectTo: 'organizations', pathMatch: 'full' },
      { path: 'organizations', component: OrganizationsTab },
      { path: 'invitations', component: InvitationsTab }
    ]
  },
  {
    path: 'organizations/:orgId',
    component: OrganizationLayout,
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectsTab },
      { path: 'members', component: OrganizationMemberTab },
      { path: 'settings', component: OrganizationSettingsTab }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
