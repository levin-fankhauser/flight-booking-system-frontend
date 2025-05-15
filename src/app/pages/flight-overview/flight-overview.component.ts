import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Flight } from '../../data/flight';
import { FlightService } from '../../service/flight.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-overview',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    CommonModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './flight-overview.component.html',
  styleUrl: './flight-overview.component.css',
})
export class FlightOverviewComponent implements OnInit {
  flightData: Flight[] = [];

  constructor(
    private service: FlightService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadFlights(true);
  }

  private loadFlights(showToast?: boolean) {
    this.service.getAllFlights().subscribe((obj) => {
      this.flightData = obj;

      if (showToast) {
        const toast = history.state.toast;

        if (toast) {
          this.messageService.add(toast);
        }
      }
    });
  }

  async editFlight(flight: Flight) {
    await this.router.navigate(['flight', flight.id]);
  }

  async addFlight() {
    await this.router.navigate(['flight']);
  }

  deleteFlight(flight: Flight, event: Event) {
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
        if (flight.id) {
          this.service.deleteFlight(flight.id).subscribe({
            next: () => {
              this.loadFlights();
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
        }
      },
    });
  }
}
