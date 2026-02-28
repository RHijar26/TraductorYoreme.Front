import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './guards/not-authenticated.guard';
import { TranslateComponent } from './pages/translate/translate.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedLayoutComponent } from './layout/shared.layout/shared.layout.component';
import { AdminLayoutComponent } from './layout/admin.layout/admin.layout.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { PhrasesComponent } from './pages/phrases/phrases.component';

export const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
       {
          path: '',
          title: 'Traductor',
          component: TranslateComponent,
          canActivate: [],
        },
        {
          path: 'login',
          title: 'Login',
          component: LoginComponent,
          canActivate: [notAuthenticatedGuard],
        },
        {
          path: 'register',
          title: 'Registro',
          component: RegisterComponent,
          canActivate: [notAuthenticatedGuard],
        },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
          path: '',
          component: PhrasesComponent,
          canActivate: [authenticatedGuard],
      }
    ]
  }

];

export default routes;
