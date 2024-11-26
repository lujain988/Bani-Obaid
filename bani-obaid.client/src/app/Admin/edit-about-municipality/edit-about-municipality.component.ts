import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-about-municipality',
  templateUrl: './edit-about-municipality.component.html',
  styleUrl: './edit-about-municipality.component.css'
})
export class EditAboutMunicipalityComponent {
  param: string | null = null;
  MunicipalityData: any = {};
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
      this._ser.getMunicipalityById(this.param).subscribe(
        (data) => {
          this.MunicipalityData = data;
        },
        (error) => {
          console.error('Error fetching municipality data:', error);
        }
      );
    }
  }

  UpdateMunicipality(data: any) {
    const formData = new FormData();

    // إضافة الحقول النصية إلى FormData
    formData.append('Description', data.description || '');
    formData.append('Vision', data.vision || '');
    formData.append('Mission', data.mission || '');

    // إضافة الصورة إلى FormData إذا تم اختيار صورة جديدة
    const fileInput = document.getElementById('descriptionImage') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('descriptionImage', fileInput.files[0]);
    }

    if (this.param !== null) {
      const id = Number(this.param); // تحويل الـ ID إلى رقم
      this._ser.editMunicipality(id, formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'تم التحديث بنجاح',
            text: 'تم تعديل بيانات البلدية بنجاح!',
            confirmButtonColor: '#3085d6'
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث بيانات البلدية.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }


}
