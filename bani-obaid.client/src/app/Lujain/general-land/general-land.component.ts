import { Component } from '@angular/core';
import { LandService } from '../Services/land.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-land',
  templateUrl: './general-land.component.html',
  styleUrl: './general-land.component.css'
})
export class GeneralLandComponent {

  landData: any[] = [];

  constructor(private _ser: LandService) { }

  ngOnInit(): void {
    this.getAllLand();
  }

  getAllLand(): void {
    this._ser.getAllLandmarks().subscribe(
      (data) => {
        this.landData = data;
        console.log('Fetched Land Data:', this.landData);
      },
      (error) => {
        console.error('Error fetching land data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch land data: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }
}
