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
import { BookingOverviewComponent } from './pages/booking-overview/booking-overview.component';
import { BookingDetailComponent } from './pages/booking-detail/booking-detail.component';
import { PassengerAdminOverviewComponent } from './pages/passenger-admin-overview/passenger-admin-overview.component';
import { PassengerAdminDetailComponent } from './pages/passenger-admin-detail/passenger-admin-detail.component';
import { BookingAdminOverviewComponent } from './pages/booking-admin-overview/booking-admin-overview.component';
import { BookingAdminDetailComponent } from './pages/booking-admin-detail/booking-admin-detail.component';

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
  {
    path: 'bookings',
    component: BookingOverviewComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
    },
  },
  {
    path: 'booking',
    component: BookingDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.User] },
  },
  {
    path: 'booking/:id',
    component: BookingDetailComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.User] },
  },
  {
    path: 'admin',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
    children: [
      { path: 'passengers', component: PassengerAdminOverviewComponent },
      { path: 'passenger', component: PassengerAdminDetailComponent },
      { path: 'passenger/:id', component: PassengerAdminDetailComponent },
      { path: 'bookings', component: BookingAdminOverviewComponent },
      { path: 'booking', component: BookingAdminDetailComponent },
      { path: 'booking/:id', component: BookingAdminDetailComponent },
    ],
  },
  { path: 'noaccess', component: NoAccessComponent },
];
