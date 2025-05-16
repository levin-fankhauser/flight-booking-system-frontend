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
import { Airplane } from '../../data/airplane';
import { Flight } from '../../data/flight';
import { AirplaneService } from '../../service/airplane.service';
import { FlightService } from '../../service/flight.service';

@Component({
  selector: 'app-flight-detail',
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

  templateUrl: './flight-detail.component.html',
  styleUrl: './flight-detail.component.css',
})
export class FlightDetailComponent implements OnInit {
  flight: Flight | undefined;
  airplanes: Airplane[] = [];
  title = 'Create Flight';
  buttonLabel = 'Create';

  public objForm = new UntypedFormGroup({
    origin: new UntypedFormControl(''),
    destination: new UntypedFormControl(''),
    airplane: new UntypedFormControl(''),
    departureDate: new UntypedFormControl(''),
    departureTime: new UntypedFormControl(''),
    arrivalDate: new UntypedFormControl(''),
    arrivalTime: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    private service: FlightService,
    private airplaneService: AirplaneService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.airplaneService.getAllAirplanes().subscribe((airplanes) => {
      this.airplanes = airplanes;
    });

    if (this.route.snapshot.paramMap.get('id')) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.service.getFlight(id).subscribe((flight) => {
        this.flight = flight;

        this.objForm.patchValue({
          origin: flight.origin,
          destination: flight.destination,
          airplane: flight.airplane.id,
          departureDate: new Date(flight.departure),
          departureTime: new Date(flight.departure),
          arrivalDate: new Date(flight.arrival),
          arrivalTime: new Date(flight.arrival),
        });

        this.title = 'Edit Flight';
        this.buttonLabel = 'Update';
      });
    }
  }

  async back() {
    await this.router.navigate(['flights']);
  }

  async save(formData: any) {
    const departureDateTime = new Date(formData.departureDate);
    departureDateTime.setHours(formData.departureTime.getHours());
    departureDateTime.setMinutes(formData.departureTime.getMinutes());

    const arrivalDateTime = new Date(formData.arrivalDate);
    arrivalDateTime.setHours(formData.arrivalTime.getHours());
    arrivalDateTime.setMinutes(formData.arrivalTime.getMinutes());

    this.flight = {
      ...this.flight,
      airplane: this.airplanes.find(
        (airplane) => airplane.id === formData.airplane
      ) as Airplane,
      origin: formData.origin,
      destination: formData.destination,
      departure: this.toLocalIsoString(departureDateTime),
      arrival: this.toLocalIsoString(arrivalDateTime),
    };

    if (this.flight) {
      if (this.flight.id) {
        this.service.updateFlight(this.flight).subscribe({
          next: () => {
            this.router.navigate(['flights'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Flight updated successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update flight',
              life: 3000,
            });
            console.error('Error updating flight:', error);
          },
        });
      } else {
        this.service.saveFlight(this.flight).subscribe({
          next: () => {
            this.router.navigate(['flights'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Flight created successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save flight',
              life: 3000,
            });
            console.error('Error saving flight:', error);
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
