import { Routes } from '@angular/router';

import {AuthenticationLayout} from './iam/layouts/authentication-layout/authentication-layout';
import {RegisterTab} from './iam/tabs/register-tab/register-tab';
import {LoginTab} from './iam/components/tabs/login-tab/login-tab';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationLayout,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'login', component: LoginTab },
      { path: 'register', component: RegisterTab },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
