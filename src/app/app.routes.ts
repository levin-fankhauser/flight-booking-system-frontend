import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AirplaneOverviewComponent } from './pages/airplane-overview/airplane-overview.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { appCanActivate } from './guard/app.auth.guard';
import { AppRoles } from './app.roles';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'airplanes',
    component: AirplaneOverviewComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Alle Spiele',
    },
  },
  { path: 'noaccess', component: NoAccessComponent },
];
