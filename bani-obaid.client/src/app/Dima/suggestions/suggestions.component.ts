import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent {
  ngOnInit() { }
  constructor(private _ser: ServicesService, private _router: Router) {
  }

  addSuggestion(data: any, form: any) {

    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'يرجى ملء جميع الحقول المطلوبة',
        text: '  (*) الرجاء التأكد من إدخال جميع الحقول المسبوقة بعلامة',
        confirmButtonText: 'موافق'
      });
      return; // Stop further execution if form is invalid
    }
    const formdata = new FormData();

    for (let key in data) {
      formdata.append(key, data[key]);
    }

    this._ser.AddSuggest(formdata).subscribe(
      (response: any) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'تم اضافة الاقتراح بنجاح',
            text: response.message, 
            confirmButtonText: 'استمرار'
          }).then(() => {
            this._router.navigate(['']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'مشكلة',
            text: response.message || 'يوجد مشكلة مؤقتة, يرجى المحاولة لاحقا',
            confirmButtonText: 'استمرار'
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'مشكلة',
          text: 'يوجد مشكلة مؤقتة, يرجى المحاولة لاحقا',
          confirmButtonText: 'استمرار'
        });
      }
    );
  }
}
