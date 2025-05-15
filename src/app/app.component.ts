import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSettingsComponent } from './components/theme-settings/theme-settings.component';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { AppAuthService } from './service/app.auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSettingsComponent, Menubar, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private authService: AppAuthService) {}

  ngOnInit() {
    this.authService.hasRole('admin').subscribe((isAdmin) => {
      if (isAdmin) {
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/',
          },
          {
            label: 'Management',
            icon: 'pi pi-sliders-h',
            items: [
              {
                label: 'Airplanes',
                icon: 'pi pi-send',
                routerLink: '/airplanes',
              },
              {
                label: 'Flights',
                icon: 'pi pi-globe',
                routerLink: '/flights',
              },
              {
                label: 'Admin Bookings',
                icon: 'pi pi-calendar',
                routerLink: '/admin/bookings',
              },
              {
                label: 'Admin Passengers',
                icon: 'pi pi-id-card',
                routerLink: '/admin/passengers',
              },
            ],
          },
          {
            label: 'Personal',
            icon: 'pi pi-user',
            items: [
              {
                label: 'Personal Bookings',
                icon: 'pi pi-calendar',
                routerLink: '/bookings',
              },
              {
                label: 'Personal Passengers',
                icon: 'pi pi-id-card',
                routerLink: '/passengers',
              },
            ],
          },
        ];
      } else {
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/',
          },
          {
            label: 'Management',
            icon: 'pi pi-sliders-h',
            items: [
              {
                label: 'Passengers',
                icon: 'pi pi-id-card',
                routerLink: '/passengers',
              },
              {
                label: 'Bookings',
                icon: 'pi pi-calendar',
                routerLink: '/bookings',
              },
            ],
          },
        ];
      }
    });
  }
}
