import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Airplane } from '../../data/airplane';
import { AirplaneService } from '../../service/airplane.service';

@Component({
  selector: 'app-airplane-overview',
  imports: [TableModule, CardModule, ButtonModule],
  templateUrl: './airplane-overview.component.html',
  styleUrl: './airplane-overview.component.css',
})
export class AirplaneOverviewComponent {
  airplaneData: Airplane[] = [];

  constructor(private service: AirplaneService, private router: Router) {}

  ngOnInit() {
    this.loadAirplanes();
  }

  private loadAirplanes() {
    this.service.getAllAirplanes().subscribe((obj) => {
      console.log(obj);

      this.airplaneData = obj;
    });
  }

  editAirplane(airplane: Airplane) {
    alert(
      'Edit airplane: \n' +
        airplane.id +
        ', ' +
        airplane.brand +
        ' ' +
        airplane.model
    );
  }

  addAirplane() {
    alert('Add airplane');
  }

  deleteAirplane(airplane: Airplane) {
    this.service.deleteAirplane(airplane.id).subscribe((obj) => {
      console.log(obj);
      this.loadAirplanes();
    });
  }
}
