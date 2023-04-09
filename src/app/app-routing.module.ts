import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { TaskManagementComponent } from './user/task-management/task-management.component';
import { AuthGuard } from './auth/auth.gaurd';
import { LoggedInAuthGuard } from './auth/loggedin-auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'task-management', component: TaskManagementComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
