import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';

@Component({
  selector: 'app-login',
  imports: [SplitButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  items: MenuItem[];
  label: string = 'Not logged in';

  constructor() {
    this.items = [
      {
        label: 'Login',
        command: () => alert,
      },
    ];
  }

  save() {
    alert('Save');
  }
}
