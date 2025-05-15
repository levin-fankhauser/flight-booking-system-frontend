import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Airplane } from '../../data/airplane';
import { AirplaneService } from '../../service/airplane.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-airplane-overview',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './airplane-overview.component.html',
  styleUrl: './airplane-overview.component.css',
})
export class AirplaneOverviewComponent {
  airplaneData: Airplane[] = [];

  constructor(
    private service: AirplaneService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadAirplanes(true);
  }

  private loadAirplanes(showToast?: boolean) {
    this.service.getAllAirplanes().subscribe((obj) => {
      this.airplaneData = obj;

      if (showToast) {
        const toast = history.state.toast;

        if (toast) {
          this.messageService.add(toast);
        }
      }
    });
  }

  async editAirplane(airplane: Airplane) {
    await this.router.navigate(['airplane', airplane.id]);
  }

  async addAirplane() {
    await this.router.navigate(['airplane']);
  }

  deleteAirplane(airplane: Airplane, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.service.deleteAirplane(airplane.id).subscribe((obj) => {
          this.loadAirplanes();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Record deleted',
            life: 3000,
          });
        });
      },
    });
  }
}
