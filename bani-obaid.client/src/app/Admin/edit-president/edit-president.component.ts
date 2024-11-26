import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-president',
  templateUrl: './edit-president.component.html',
  styleUrl: './edit-president.component.css'
})
export class EditPresidentComponent {
  param: string | null = null;
  presidentData: any = {};
  image: SafeUrl | null = null;

  constructor(
    private _ser: ServiceService,
    private _active: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  imageChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    if (this.param !== null) {
      this._ser.getPresidentById(this.param).subscribe(
        (data) => {
          this.presidentData = data;
        },
        (error) => {
          console.error('Error fetching president data:', error);
        }
      );
    }
  }

  UpdatePresident(data: any) {
    const formData = new FormData();

    // إضافة الحقول النصية إلى FormData
    formData.append('Name', data.name || '');
    formData.append('Speech', data.speech || '');

    // إضافة الصورة إلى FormData إذا تم اختيار صورة جديدة
    if (this.image) {
      const fileInput = document.getElementById('presidentImage') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('Image', fileInput.files[0]);
      }
    }

    if (this.param !== null) {
      const id = Number(this.param); // تحويل الـ ID إلى رقم
      this._ser.editPresident(id, formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'تم التحديث بنجاح',
            text: 'تم تعديل كلمة الرئيس بنجاح!',
            confirmButtonColor: '#3085d6'
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث كلمة الرئيس.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }


}
