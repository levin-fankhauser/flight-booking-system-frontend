import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSettingsComponent } from './components/theme-settings/theme-settings.component';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSettingsComponent, Menubar, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
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
            routerLink: '',
          },
          {
            label: 'Bookings',
            icon: 'pi pi-calendar',
            routerLink: '',
          },
          {
            label: 'Airplanes',
            icon: 'pi pi-send',
            routerLink: '/airplanes',
          },
          {
            label: 'Flights',
            icon: 'pi pi-globe',
            routerLink: '',
          },
        ],
      },
    ];
  }
}
