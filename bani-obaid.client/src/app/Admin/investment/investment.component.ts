import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent {

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


  deleteinvestment(investmentId: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هل تريد حقا حذف الفرصة الاستثمارية؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'تراجع',
      confirmButtonText: 'نعم , قم بالحذف'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteinvestment(investmentId).subscribe(
          () => {
            console.log('Tender deleted with ID:', investmentId);

            // Refresh the tender data
            this.GetAllInvestments();

            Swal.fire(
              '! حذف ',
              'لقد تم حذف الفرصة الاستثمارية بنجاح',
              'success'
            );
          },
          (error) => {
            console.error('مشكلة في حذف الفرصة الاستثمارية:', error);
            Swal.fire(
              'Error!',
              'هناك مشكلة مؤقتة ,يؤجى المحاولة لاحقا',
              'error'
            );
          }
        );
      }
    });
  }

}
