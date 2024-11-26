import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.component.html',
  styleUrl: './add-investment.component.css'
})
export class AddInvestmentComponent {
  image: any;

  constructor(private _ser: ServicesService, private _router: Router) { }

  ngOnInit(): void { }

  changeImage(event: any, field: string): void {
    const file = event.target.files[0];
    if (field === 'Image') {
      this.image = file;
    }
  }

  // Method to handle form submission
  addInvestment(data: any): void {
    // Check if image is selected
    if (!this.image) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: 'يجب اختيار الصورة الرئيسية',
        confirmButtonText: 'حسنًا'
      });
      return;
    }

    if (!data.Name || !data.Description || !data.FinalDate) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى تعبئة جميع الحقول المطلوبة',
        confirmButtonText: 'OK',
      });
      return; 
    }

    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append('Image', this.image);

    // Call the service to create the investment
    this._ser.createinvestment(form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم إضافة الاستثمار بنجاح!',
          confirmButtonText: 'حسنًا'
        }).then(() => {
          this._router.navigate(['adminDashboard/invesments']);
        });
      },
      (error) => {
        console.error('Error adding investment', error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء إضافة الاستثمار. يرجى المحاولة مرة أخرى.',
          confirmButtonText: 'حسنًا'
        });
      }
    );
  }
}
