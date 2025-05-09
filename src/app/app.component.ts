import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSettingsComponent } from './components/theme-settings/theme-settings.component';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSettingsComponent, Menubar],
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
        routerLink: '',
      },
    ];
  }
}
