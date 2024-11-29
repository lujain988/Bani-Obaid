import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  PartnerData: any = {
    name: '',
    link: ''
  };
  logo: any;
  isSubmitted = false;

  constructor(private _ser: ServiceService) { }

  // دالة تغيير الصورة (الشعار)
  imageChange(e: any) {
    this.logo = e.target.files[0];
  }

  // دالة إضافة الشريك
  AddNewPartner(form: any) {
    this.isSubmitted = true;

    // تحقق من صحة البيانات
    if (!form.valid || !this.logo) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى تعبئة جميع الحقول المطلوبة وتحميل صورة الشعار.',
        confirmButtonColor: '#d33'
      });
      this.isSubmitted = false; // إعادة تمكين الزر في حالة الخطأ
      return;
    }

    const formData = new FormData();
    // إضافة جميع البيانات المدخلة إلى FormData
    for (let key in form.value) {
      formData.append(key, form.value[key]);
    }
    formData.append("logo", this.logo);

    // إرسال البيانات إلى الخدمة
    this._ser.addPartner(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تمت إضافة الشريك بنجاح.',
          confirmButtonColor: '#3085d6'
        });
        this.isSubmitted = false;
        form.reset();
        this.logo = null; // إعادة تعيين الصورة بعد الإضافة
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
        this.isSubmitted = false; // إعادة تمكين الزر في حالة الخطأ
      }
    );
  }
}
