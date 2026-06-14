import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './guards/not-authenticated.guard';
import { TranslateComponent } from './pages/translate/translate.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedLayoutComponent } from './layout/shared.layout/shared.layout.component';
import { AdminLayoutComponent } from './layout/admin.layout/admin.layout.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { PhrasesComponent } from './pages/phrases/phrases.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { ModelsComponent } from './pages/models/models.component';
import { UsersComponent } from './pages/users/users.component';
import { SetPasswordComponent } from './pages/register/pages/set.password/set.password.component';

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
      },
      {
          path: 'regions',
          component: RegionsComponent,
          canActivate: [authenticatedGuard],
      },
      {
          path: 'models',
          component:  ModelsComponent,
          canActivate: [authenticatedGuard],
      },
      {
          path: 'users',
          component:  UsersComponent,
          canActivate: [authenticatedGuard],
      }
    ]
  },
  {
    path: 'set-password',
    title: 'Configurar contraseña',
    component: SetPasswordComponent,
    canActivate: [],
  }

];

export default routes;
