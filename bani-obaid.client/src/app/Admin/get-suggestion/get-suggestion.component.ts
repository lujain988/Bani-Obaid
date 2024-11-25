import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-suggestion',
  templateUrl: './get-suggestion.component.html',
  styleUrl: './get-suggestion.component.css'
})
export class GetSuggestionComponent {

  suggestData: any[] = [];

  constructor(private _ser: ServicesService, private router: Router) {


  }

  ngOnInit() {
    console.log('ngOnInit executed');
    debugger;

    this.GetSuggestion();
  }

  GetSuggestion() {
    debugger;

    this._ser.getAllSuggestion().subscribe(
      (data) => {
        this.suggestData = data;
        console.log('sugestion fetched:', this.suggestData);
      },
      (error) => {
        console.error('Error fetching suggestions:', error);
      }
    );
  }

  deletesuggestion(suggestid: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هل تريد حقا حذف الاقتراح؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'تراجع',
      confirmButtonText: 'نعم , قم بالحذف'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deletesuggest(suggestid).subscribe(
          () => {
            console.log('Tender deleted with ID:', suggestid);

            // Refresh the tender data
            this.GetSuggestion();

            Swal.fire(
              '! حذف ',
              'لقد تم حذف الاقتراح بنجاح',
              'success'
            );
          },
          (error) => {
            console.error('مشكلة في حذف الاقتراح:', error);
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
