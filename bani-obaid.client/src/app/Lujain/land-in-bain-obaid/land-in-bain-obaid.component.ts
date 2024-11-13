import { Component } from '@angular/core';
import { LujainService } from '../Services/lujain.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-land-in-bain-obaid',
  templateUrl: './land-in-bain-obaid.component.html',
  styleUrl: './land-in-bain-obaid.component.css'
})
export class LandInBainObaidComponent {

  landData: any[] = [];

  constructor(private _ser: LujainService) { }

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
