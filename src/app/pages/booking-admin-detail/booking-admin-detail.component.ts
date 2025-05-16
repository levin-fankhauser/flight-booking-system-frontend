import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Booking } from '../../data/booking';
import { Flight } from '../../data/flight';
import { Passenger } from '../../data/passenger';
import { BookingAdminService } from '../../service/booking-admin.service';
import { FlightService } from '../../service/flight.service';
import { PassengerAdminService } from '../../service/passenger-admin.service';

@Component({
  selector: 'app-booking-admin-detail',
  imports: [
    CardModule,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    ButtonModule,
    ToastModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  providers: [MessageService, provideNativeDateAdapter()],
  templateUrl: './booking-admin-detail.component.html',
  styleUrl: './booking-admin-detail.component.css',
})
export class BookingAdminDetailComponent implements OnInit {
  booking: Booking | undefined;
  passengers: Passenger[] = [];
  flights: Flight[] = [];
  title = 'Create Booking';
  buttonLabel = 'Create';

  public objForm = new UntypedFormGroup({
    passenger: new UntypedFormControl(''),
    origin: new UntypedFormControl(''),
    destination: new UntypedFormControl(''),
    departureDate: new UntypedFormControl(''),
    departureTime: new UntypedFormControl(''),
    arrivalDate: new UntypedFormControl(''),
    arrivalTime: new UntypedFormControl(''),
    firstFlight: new UntypedFormControl(''),
    secondFlight: new UntypedFormControl(''),
    thirdFlight: new UntypedFormControl(''),
    bookingDate: new UntypedFormControl(''),
    bookingTime: new UntypedFormControl(''),
    createdBy: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    private service: BookingAdminService,
    private passengerService: PassengerAdminService,
    private flightService: FlightService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.passengerService.getAllPassengers().subscribe((passengers) => {
      this.passengers = passengers;
    });
    this.flightService.getAllFlights().subscribe((flights) => {
      this.flights = flights;
    });

    if (this.route.snapshot.paramMap.get('id')) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.service.getBooking(id).subscribe((booking) => {
        this.booking = booking;

        this.objForm.patchValue({
          passenger: booking.passenger.id,
          origin: booking.origin,
          destination: booking.destination,
          departureDate: new Date(booking.departure),
          departureTime: new Date(booking.departure),
          arrivalDate: new Date(booking.arrival),
          arrivalTime: new Date(booking.arrival),
          firstFlight: booking.firstFlight.id,
          secondFlight: booking.secondFlight?.id,
          thirdFlight: booking.thirdFlight?.id,
          bookingDate: new Date(booking.bookingDate),
          bookingTime: new Date(booking.bookingDate),
          createdBy: booking.createdBy,
        });

        this.title = 'Edit Booking';
        this.buttonLabel = 'Update';
      });
    } else {
      this.objForm.patchValue({
        bookingDate: new Date(),
        bookingTime: new Date(),
      });
    }
  }

  async back() {
    await this.router.navigate(['admin/bookings']);
  }

  async save(formData: any) {
    const departureDateTime = new Date(formData.departureDate);
    departureDateTime.setHours(formData.departureTime.getHours());
    departureDateTime.setMinutes(formData.departureTime.getMinutes());

    const arrivalDateTime = new Date(formData.arrivalDate);
    arrivalDateTime.setHours(formData.arrivalTime.getHours());
    arrivalDateTime.setMinutes(formData.arrivalTime.getMinutes());

    const bookingDateTime = new Date(formData.bookingDate);
    bookingDateTime.setHours(formData.bookingTime.getHours());
    bookingDateTime.setMinutes(formData.bookingTime.getMinutes());

    this.booking = {
      ...this.booking,
      passenger: this.passengers.find(
        (passenger) => passenger.id === formData.passenger
      ) as Passenger,
      origin: formData.origin,
      destination: formData.destination,
      departure: this.toLocalIsoString(departureDateTime),
      arrival: this.toLocalIsoString(arrivalDateTime),
      firstFlight: this.flights.find(
        (flight) => flight.id === formData.firstFlight
      ) as Flight,
      secondFlight: this.flights.find(
        (flight) => flight.id === formData.secondFlight
      ) as Flight,
      thirdFlight: this.flights.find(
        (flight) => flight.id === formData.thirdFlight
      ) as Flight,
      bookingDate: this.toLocalIsoString(bookingDateTime),
      createdBy: formData.createdBy,
    };

    if (this.booking) {
      if (this.booking.id) {
        this.service.updateBooking(this.booking).subscribe({
          next: () => {
            this.router.navigate(['admin/bookings'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Booking updated successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update booking',
              life: 3000,
            });
            console.error('Error updating booking:', error);
          },
        });
      } else {
        this.service.saveBooking(this.booking).subscribe({
          next: () => {
            this.router.navigate(['admin/bookings'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Booking created successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save booking',
              life: 3000,
            });
            console.error('Error saving booking:', error);
          },
        });
      }
    }
  }

  toLocalIsoString(date: Date): string {
    const pad = (n: any) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }
}
