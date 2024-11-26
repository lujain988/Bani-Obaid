import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  MemberData: any = {
    name: '',
    role: ''
  };
  image: any;
  isSubmitted = false;

  constructor(private _ser: ServiceService) { }

  ngOnInit() { }

  imageChange(e: any) {
    this.image = e.target.files[0];
  }

  AddNewMember(form: any) {
    this.isSubmitted = true;

    if (!form.valid || !this.image) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى تعبئة جميع الحقول المطلوبة وتحميل صورة.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const formData = new FormData();
    for (let key in form.value) {
      formData.append(key, form.value[key]);
    }
    formData.append("image", this.image);

    this._ser.addMember(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تمت إضافة العضو بنجاح.',
          confirmButtonColor: '#3085d6'
        });
        this.isSubmitted = false;
        form.reset();
        this.image = null;
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
      }
    );
  }
}
