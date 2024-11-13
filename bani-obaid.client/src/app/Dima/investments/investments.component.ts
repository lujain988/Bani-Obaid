import { Component } from '@angular/core';
import { ServicesService } from '../DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.css'
})
export class InvestmentsComponent {

  investmentdata: any[] = [];

  constructor(private _ser: ServicesService) { }

  ngOnInit(): void {
    this.GetAllInvestments();
  }

  GetAllInvestments(): void {
    this._ser.getAllinvestents().subscribe(
      (data) => {
        this.investmentdata = data;
        console.log('Fetched investment Data:', this.investmentdata);
      },
      (error) => {
        console.error('Error fetching investment data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch investment data: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }



}
