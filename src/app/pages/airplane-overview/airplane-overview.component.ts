import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AirplaneService } from '../../service/airplane.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Airplane } from '../../data/airplane';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airplane-overview',
  imports: [MatTableModule, CommonModule],
  templateUrl: './airplane-overview.component.html',
  styleUrl: './airplane-overview.component.css',
})
export class AirplaneOverviewComponent {
  public airplaneDataSource = new MatTableDataSource<Airplane>();
  public columns = [
    'id',
    'brand',
    'model',
    'constructionYear',
    'airline',
    'seatCapacity',
    'createdBy',
  ];

  constructor(private service: AirplaneService, private router: Router) {}

  ngOnInit() {
    this.loadAirplanes();
  }

  private loadAirplanes() {
    this.service.getAllAirplanes().subscribe((obj) => {
      console.log(obj);

      this.airplaneDataSource.data = obj;
    });
  }
}
