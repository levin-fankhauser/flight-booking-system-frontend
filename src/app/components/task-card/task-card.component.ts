import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-card',
  imports: [CardModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) taskTitle!: string;
  @Input({ required: true }) taskIcon!: string;
  @Input({ required: true }) route!: string;

  iconClass: string = 'pi text-9xl';

  constructor(private router: Router) {}

  ngOnInit() {
    this.iconClass = `pi ${this.taskIcon} text-9xl`;
  }

  onClick() {
    this.router.navigate([this.route]);
  }
}
