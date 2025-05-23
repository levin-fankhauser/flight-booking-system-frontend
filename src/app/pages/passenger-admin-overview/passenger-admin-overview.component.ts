import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Passenger } from '../../data/passenger';
import { PassengerAdminService } from '../../service/passenger-admin.service';

@Component({
  selector: 'app-passenger-admin-overview',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './passenger-admin-overview.component.html',
  styleUrl: './passenger-admin-overview.component.css',
})
export class PassengerAdminOverviewComponent implements OnInit {
  passengerData: Passenger[] = [];

  constructor(
    private service: PassengerAdminService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadPassengers(true);
  }

  private loadPassengers(showToast?: boolean) {
    this.service.getAllPassengers().subscribe((passengers) => {
      this.passengerData = passengers;

      if (showToast) {
        const toast = history.state.toast;

        if (toast) {
          this.messageService.add(toast);
        }
      }
    });
  }

  async editPassenger(passenger: Passenger) {
    await this.router.navigate(['admin/passenger', passenger.id]);
  }

  async addPassenger() {
    await this.router.navigate(['admin/passenger']);
  }

  deletePassenger(passenger: Passenger, event: Event) {
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
        this.service.deletePassenger(passenger.id).subscribe({
          next: () => {
            this.loadPassengers();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Record deleted',
              life: 3000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Failed to delete record - please delete linked booking first!',
              life: 5000,
            });
            console.error('Delete error:', err);
          },
        });
      },
    });
  }
}
