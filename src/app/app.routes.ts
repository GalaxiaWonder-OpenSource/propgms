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
import {ProjectLayout} from './projects/layouts/project-layout/project-layout';
import {ProjectSettingsTab} from './projects/tabs/project-settings-tab/project-settings-tab';
import {ClientLayout} from './projects/layouts/client-layout/client-layout';
import {ProjectTrackingLayout} from './change/layouts/project-tracking-layout/project-tracking-layout';
import {SummaryTab} from './change/tabs/summary-tab/summary-tab';
import {ChangeProcessTab} from './change/tabs/change-process-tab/change-process-tab';
import {ClientScheduleTab} from './projects/tabs/client-schedule-tab/client-schedule-tab.component';
import {FindOrganizationsTab} from './projects/tabs/find-organizations-tab/find-organizations-tab';
import {ScheduleTab} from './projects/tabs/schedule-tab/schedule-tab';

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
  {
    path: 'projects/:orgId',
    component: ProjectLayout,
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      { path: 'schedule', component: ScheduleTab },
      { path: 'settings', component: ProjectSettingsTab }
    ]
  },
  {
    path: 'client',
    component: ClientLayout,
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectsTab },
      { path: 'organizations', component: FindOrganizationsTab }
    ]
  },
  {
    path: 'project-tracking/:proId',
    component: ProjectTrackingLayout,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full'},
      { path: 'summary', component: SummaryTab },
      { path: 'change-process', component: ChangeProcessTab },
      { path: 'schedule', component: ClientScheduleTab }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
