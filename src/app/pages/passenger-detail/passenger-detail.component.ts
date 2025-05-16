import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Passenger } from '../../data/passenger';
import { PassengerService } from '../../service/passenger.service';

@Component({
  selector: 'app-passenger-detail',
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
  ],
  providers: [MessageService],
  templateUrl: './passenger-detail.component.html',
  styleUrl: './passenger-detail.component.css',
})
export class PassengerDetailComponent implements OnInit {
  passenger: Passenger | undefined;
  title = 'Create Passenger';
  buttonLabel = 'Create';

  public objForm = new UntypedFormGroup({
    lastname: new UntypedFormControl(''),
    firstname: new UntypedFormControl(''),
    age: new UntypedFormControl(''),
    nationality: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    private service: PassengerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.service.getPassenger(id).subscribe((passenger) => {
        this.passenger = passenger;
        this.objForm = this.formBuilder.group(passenger);
        this.title = 'Edit Passenger';
        this.buttonLabel = 'Update';
      });
    }
  }

  async back() {
    await this.router.navigate(['passengers']);
  }

  async save(formData: any) {
    this.passenger = Object.assign(formData);

    if (this.passenger) {
      if (this.passenger.id) {
        this.service.updatePassenger(this.passenger).subscribe({
          next: () => {
            this.router.navigate(['passengers'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Passenger updated successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update Passenger',
              life: 3000,
            });
            console.error('Error updating passenger:', error);
          },
        });
      } else {
        this.service.savePassenger(this.passenger).subscribe({
          next: () => {
            this.router.navigate(['passengers'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Passenger created successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save passenger',
              life: 3000,
            });
            console.error('Error saving passenger:', error);
          },
        });
      }
    }
  }
}
