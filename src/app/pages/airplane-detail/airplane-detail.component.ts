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
import { Airplane } from '../../data/airplane';
import { AirplaneService } from '../../service/airplane.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-airplane-detail',
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
  templateUrl: './airplane-detail.component.html',
  styleUrl: './airplane-detail.component.css',
})
export class AirplaneDetailComponent implements OnInit {
  airplane: Airplane | undefined;
  title = 'Create Airplane';
  buttonLabel = 'Create';

  public objForm = new UntypedFormGroup({
    brand: new UntypedFormControl(''),
    model: new UntypedFormControl(''),
    constructionYear: new UntypedFormControl(''),
    airline: new UntypedFormControl(''),
    seatCapacity: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    private service: AirplaneService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.service.getAirplane(id).subscribe((airplane) => {
        this.airplane = airplane;
        this.objForm = this.formBuilder.group(airplane);
        this.title = 'Edit Airplane';
        this.buttonLabel = 'Update';
      });
    }
  }

  async back() {
    await this.router.navigate(['airplanes']);
  }

  async save(formData: any) {
    this.airplane = Object.assign(formData);

    if (this.airplane) {
      if (this.airplane.id) {
        this.service.updateAirplane(this.airplane).subscribe({
          next: () => {
            this.router.navigate(['airplanes'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Airplane updated successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update airplane',
              life: 3000,
            });
            console.error('Error updating airplane:', error);
          },
        });
      } else {
        this.service.saveAirplane(this.airplane).subscribe({
          next: () => {
            this.router.navigate(['airplanes'], {
              state: {
                toast: {
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Airplane created successfully',
                  life: 3000,
                },
              },
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save airplane',
              life: 3000,
            });
            console.error('Error saving airplane:', error);
          },
        });
      }
    }
  }
}
