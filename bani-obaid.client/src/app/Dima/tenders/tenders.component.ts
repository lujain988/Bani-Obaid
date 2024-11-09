import { Component } from '@angular/core';
import { ServicesService } from '../DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrl: './tenders.component.css'
})
export class TendersComponent {

  tenderdata: any[] = [];

  constructor(private _ser: ServicesService) { }

  ngOnInit(): void {
    this.GetAllTenders();
  }

  GetAllTenders(): void {
    this._ser.getAllTenders().subscribe(
      (data) => {
        this.tenderdata = data;
        console.log('Fetched tender Data:', this.tenderdata);
      },
      (error) => {
        console.error('Error fetching tender data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch tender data: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }



}
