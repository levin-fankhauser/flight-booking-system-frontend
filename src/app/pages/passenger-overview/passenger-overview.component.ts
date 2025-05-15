import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Passenger } from '../../data/passenger';
import { PassengerService } from '../../service/passenger.service';

@Component({
  selector: 'app-passenger-overview',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './passenger-overview.component.html',
  styleUrl: './passenger-overview.component.css',
})
export class PassengerOverviewComponent implements OnInit {
  passengerData: Passenger[] = [];

  constructor(
    private service: PassengerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadPassengers(true);
  }

  private loadPassengers(showToast?: boolean) {
    this.service.getAllPassengers().subscribe((obj) => {
      this.passengerData = obj;

      if (showToast) {
        const toast = history.state.toast;

        if (toast) {
          this.messageService.add(toast);
        }
      }
    });
  }

  async editPassenger(passenger: Passenger) {
    await this.router.navigate(['passenger', passenger.id]);
  }

  async addPassenger() {
    await this.router.navigate(['passenger']);
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
        this.service.deletePassenger(passenger.id).subscribe(() => {
          this.loadPassengers();
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
