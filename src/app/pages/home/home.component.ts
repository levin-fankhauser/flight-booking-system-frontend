import { Component } from '@angular/core';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { IsInRoleDirective } from '../../dir/is.in.role.dir';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-home',
  imports: [TaskCardComponent, IsInRoleDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AppAuthService) {}

  ngOnInit() {
    this.authService.hasRole('admin').subscribe((obj) => {
      console.log('Role:', obj);
    });
  }
}
