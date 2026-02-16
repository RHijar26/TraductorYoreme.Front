import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './guards/not-authenticated.guard';
import { TranslateComponent } from './pages/translate/translate.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: TranslateComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthenticatedGuard],
  },
];

export default routes;
