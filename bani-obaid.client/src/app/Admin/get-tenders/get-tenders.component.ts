import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-tenders',
  templateUrl: './get-tenders.component.html',
  styleUrl: './get-tenders.component.css'
})
export class GetTendersComponent {

  tenderdata: any[] = [];
 
  constructor(private _ser: ServicesService, private router: Router) {


  }

  ngOnInit() {
    console.log('ngOnInit executed');
    debugger;

    this.GetTenders();
  }

  GetTenders() {
    debugger;

    this._ser.getAllTenders().subscribe(
      (data) => {
        this.tenderdata = data;
        console.log('Tenders fetched:', this.tenderdata); 
      },
      (error) => {
        console.error('Error fetching tenders:', error);
      }
    );
  }

  deleteTenders(tenderId: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هل تريد حقا حذف العطاء؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'تراجع',
      confirmButtonText: 'نعم , قم بالحذف'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteTender(tenderId).subscribe(
          () => {
            console.log('Tender deleted with ID:', tenderId);

            // Refresh the tender data
            this.GetTenders();

            Swal.fire(
              '! حذف ',
              'لقد تم حذف العطاء بنجاح',
              'success'
            );
          },
          (error) => {
            console.error('مشكلة في حذف العطاء:', error);
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
