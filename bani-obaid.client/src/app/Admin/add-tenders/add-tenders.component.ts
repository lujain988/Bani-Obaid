import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tenders',
  templateUrl: './add-tenders.component.html',
  styleUrl: './add-tenders.component.css'
})
export class AddTendersComponent {
  image: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;

  constructor(private _ser: ServicesService, private _router: Router) { }

  ngOnInit(): void { }

  changeImage(event: any, field: string): void {
    const file = event.target.files[0];
    if (field === 'Image') this.image = file;
    else if (field === 'Img1') this.img1 = file;
    else if (field === 'Img2') this.img2 = file;
    else if (field === 'Img3') this.img3 = file;
    else if (field === 'Img4') this.img4 = file;
    else if (field === 'Img5') this.img5 = file;
  }

  addTender(data: any): void {
    if (!this.image) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: 'يجب اختيار الصورة الرئيسية',
        confirmButtonText: 'حسنًا'
      });
      return;
    }
    // Check if all required form fields are filled
    if (!data.Title || !data.Description || !data.Amount || !data.ClosingDate) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى تعبئة جميع الحقول المطلوبة',
        confirmButtonText: 'OK',
      });
      return; // Prevent form submission if any required field is empty
    }

    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    // Append images
    form.append('Image', this.image);
    if (this.img1) form.append('Img1', this.img1);
    if (this.img2) form.append('Img2', this.img2);
    if (this.img3) form.append('Img3', this.img3);
    if (this.img4) form.append('Img4', this.img4);
    if (this.img5) form.append('Img5', this.img5);

    this._ser.createTender(form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم إضافة العطاء بنجاح!',
          confirmButtonText: 'حسنًا'
        }).then(() => {
          this._router.navigate(['adminDashboard/tenders']);
        });
      },
      (error) => {
        console.error('Error adding tender', error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء إضافة العطاء. يرجى المحاولة مرة أخرى.',
          confirmButtonText: 'حسنًا'
        });
      }
    );
  }
}
