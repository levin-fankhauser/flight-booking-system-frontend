import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
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
export class AirplaneDetailComponent {
  airplane: Airplane | undefined;
  title: string = 'Create new Airplane';

  public objForm = new UntypedFormGroup({
    brand: new UntypedFormControl(''),
    model: new UntypedFormControl(''),
    constructionYear: new UntypedFormControl(''),
    airline: new UntypedFormControl(''),
    seatCapacity: new UntypedFormControl(''),
    createdBy: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    private service: AirplaneService,
    private messageService: MessageService
  ) {}

  async back() {
    await this.router.navigate(['airplanes']);
  }

  async save(formData: any) {
    this.airplane = Object.assign(formData);

    if (this.airplane) {
      this.service.saveAirplane(this.airplane).subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Airplane saved successfully',
          });
          this.router.navigate(['airplanes']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to save airplane',
          });
          console.error('Error saving airplane:', error);
        },
      });
    }
  }
}
