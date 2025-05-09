import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AirplaneOverviewComponent } from './pages/airplane-overview/airplane-overview.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'airplanes', component: AirplaneOverviewComponent },
];
