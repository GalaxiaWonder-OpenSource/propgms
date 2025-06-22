import { Routes } from '@angular/router';
import {AuthenticationLayout} from './iam/layouts/authentication-layout/authentication-layout';
//import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found";

export const routes: Routes = [
  //{ path: '',                 redirectTo: 'login', pathMatch: 'full' },
  //{ path: '**',               component: PageNotFoundComponent }
  {
    path: '',
    component: AuthenticationLayout,
    children: [
      //*
      // {
      //         path: 'login',
      //         loadComponent: () =>
      //           import('../features/auth/login.component').then(m => m.LoginComponent)
      //       },
      //       {
      //         path: 'register',
      //         loadComponent: () =>
      //           import('../features/auth/register.component').then(m => m.RegisterComponent)
      //       },
      //       { path: '', redirectTo: 'login', pathMatch: 'full' }
      //
      //
      //
      //
      //
      //
    ]
  }
];
