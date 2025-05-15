import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AirplaneOverviewComponent } from './pages/airplane-overview/airplane-overview.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { appCanActivate } from './guard/app.auth.guard';
import { AppRoles } from './app.roles';
import { AirplaneDetailComponent } from './pages/airplane-detail/airplane-detail.component';
import { PassengerOverviewComponent } from './pages/passenger-overview/passenger-overview.component';
import { PassengerDetailComponent } from './pages/passenger-detail/passenger-detail.component';
import { FlightOverviewComponent } from './pages/flight-overview/flight-overview.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'airplanes',
    component: AirplaneOverviewComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
    },
  },
  {
    path: 'airplane',
    component: AirplaneDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
  {
    path: 'airplane/:id',
    component: AirplaneDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
  {
    path: 'passengers',
    component: PassengerOverviewComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
    },
  },
  {
    path: 'passenger',
    component: PassengerDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.User] },
  },
  {
    path: 'passenger/:id',
    component: PassengerDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.User] },
  },
  {
    path: 'flights',
    component: FlightOverviewComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
    },
  },
  {
    path: 'flight',
    component: FlightDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
  {
    path: 'flight/:id',
    component: FlightDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
  { path: 'noaccess', component: NoAccessComponent },
];
