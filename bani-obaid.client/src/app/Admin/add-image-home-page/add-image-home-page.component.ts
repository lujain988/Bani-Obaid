import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-image-home-page',
  templateUrl: './add-image-home-page.component.html',
  styleUrls: ['./add-image-home-page.component.css']
})
export class AddImageHomePageComponent {
  ImagesData: any = {
    homeTitle: '',
    homeDescription: ''
  };
  homeImage: any;
  isSubmitted = false;

  constructor(private _ser: ServiceService) { }

  imageChange(e: any) {
    this.homeImage = e.target.files[0];
  }

  AddNewImages(form: any) {
    this.isSubmitted = true;

    if (!form.valid || !this.homeImage) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى تعبئة جميع الحقول المطلوبة وتحميل صورة للصفحة الرئيسية.',
        confirmButtonColor: '#d33'
      });
      this.isSubmitted = false;
      return;
    }

    const formData = new FormData();
    for (let key in form.value) {
      formData.append(key, form.value[key]);
    }
    formData.append("homeImage", this.homeImage); // تأكد من إرسال صورة الصفحة الرئيسية

    this._ser.addHomeImage(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'تم التحديث بنجاح',
          text: 'تم تحديث الصورة في الصفحة الرئيسية بنجاح.',
          confirmButtonColor: '#3085d6'
        });
        this.isSubmitted = false;
        form.reset();
        this.homeImage = null;
      },
      (error) => {
        let errorMessage = 'حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.';
        if (error.status === 400) {
          errorMessage = 'هناك خطأ في البيانات المدخلة. يرجى التحقق من المدخلات.';
        } else if (error.status === 500) {
          errorMessage = 'حدث خطأ داخلي في الخادم. يرجى المحاولة لاحقًا.';
        }
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: errorMessage,
          confirmButtonColor: '#d33'
        });
        this.isSubmitted = false;
      }
    );
  }

}
