import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Booking } from '../../data/booking';
import { BookingAdminService } from '../../service/booking-admin.service';

@Component({
  selector: 'app-booking-admin-overview',
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    CommonModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './booking-admin-overview.component.html',
  styleUrl: './booking-admin-overview.component.css',
})
export class BookingAdminOverviewComponent implements OnInit {
  bookingData: Booking[] = [];

  constructor(
    private service: BookingAdminService,
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
    await this.router.navigate(['admin/booking', booking.id]);
  }

  async addBooking() {
    await this.router.navigate(['admin/booking']);
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
