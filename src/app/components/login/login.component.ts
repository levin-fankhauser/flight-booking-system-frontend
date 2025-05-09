import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-login',
  imports: [SplitButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  items: MenuItem[] | undefined;
  label: string = 'Not logged in';
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
          command: () => this.logout(),
        },
      ];
    } else {
      this.label = 'Not logged in';
      this.items = [
        {
          label: 'Login',
          command: () => this.login(),
        },
      ];
    }
  }

  public login() {
    this.authService.login();
    this.checkState();
  }

  public logout() {
    this.authService.logout();
    this.checkState();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
