import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-login',
  imports: [SplitButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  items: MenuItem[] | undefined;
  label = 'Not logged in';
  username = '';

  constructor(private authService: AppAuthService) {}

  ngOnInit() {
    this.authService.usernameObservable.subscribe((name) => {
      this.username = name;
      this.checkState();
    });
    this.checkState();
  }

  checkState() {
    if (this.isAuthenticated()) {
      this.label = this.username;
      this.items = [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        },
      ];
    } else {
      this.label = 'Not logged in';
      this.items = [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          command: () => this.login(),
        },
      ];
    }
  }

  login() {
    this.authService.login();
    this.checkState();
  }

  logout() {
    this.authService.logout();
    this.checkState();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
