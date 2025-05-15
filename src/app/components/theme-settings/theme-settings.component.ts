import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-settings',
  imports: [ButtonModule],
  templateUrl: './theme-settings.component.html',
  styleUrl: './theme-settings.component.css',
})
export class ThemeSettingsComponent {
  icon = 'pi pi-moon';

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
    this.icon = element?.classList.contains('my-app-dark')
      ? 'pi pi-sun'
      : 'pi pi-moon';
  }
}
