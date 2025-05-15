import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Booking } from '../../data/booking';
import { BookingService } from '../../service/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-overview',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    CommonModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './booking-overview.component.html',
  styleUrl: './booking-overview.component.css',
})
export class BookingOverviewComponent implements OnInit {
  bookingData: Booking[] = [];

  constructor(
    private service: BookingService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadBookings(true);
  }

  private loadBookings(showToast?: boolean) {
    this.service.getAllBookings().subscribe((obj) => {
      this.bookingData = obj;

      if (showToast) {
        const toast = history.state.toast;

        if (toast) {
          this.messageService.add(toast);
        }
      }
    });
  }

  async editBooking(booking: Booking) {
    await this.router.navigate(['booking', booking.id]);
  }

  async addBooking() {
    await this.router.navigate(['booking']);
  }

  deleteBooking(booking: Booking, event: Event) {
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
        if (booking.id) {
          this.service.deleteBooking(booking.id).subscribe(() => {
            this.loadBookings();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Record deleted',
              life: 3000,
            });
          });
        }
      },
    });
  }
}
