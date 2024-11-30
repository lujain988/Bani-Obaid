import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-partners',
  templateUrl: './edit-partners.component.html',
  styleUrls: ['./edit-partners.component.css']
})
export class EditPartnersComponent {
  param: string | null = null;
  PartnerData: any = {
    name: '',
    link: '',
    logo: ''
  };

  logo: SafeUrl | null = null;

  constructor(
    private _ser: ServiceService,
    private _active: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    if (this.param !== null) {
      this._ser.getPartnerById(this.param).subscribe(
        (data) => {
          this.PartnerData = data;
        },
        (error) => {
          console.error('Error fetching Partner data:', error);
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'تعذر تحميل بيانات الشريك. يرجى المحاولة لاحقًا.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }

  // دالة التعامل مع تحميل الصور
  imageChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.logo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  // دالة تحديث بيانات الشريك
  UpdatePartner(data: any) {
    // التحقق من الحقول المطلوبة
    if (!data.name) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى إدخال اسم الشريك.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!data.link || !this.isValidUrl(data.link)) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الرابط',
        text: 'يرجى إدخال رابط صالح.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!this.logo && !this.PartnerData.logo) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى تحميل صورة جديدة أو التأكد من وجود صورة حالية.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const formData = new FormData();

    // إضافة الحقول النصية إلى FormData
    formData.append('name', data.name || '');
    formData.append('link', data.link || '');

    // إضافة الصورة إلى FormData إذا تم اختيار صورة جديدة
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('logo', fileInput.files[0]);
    }

    // إرسال البيانات إلى الخادم
    if (this.param !== null) {
      const id = Number(this.param);
      this._ser.editPartner(id, formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'تم التحديث بنجاح',
            text: 'تم تعديل بيانات الشريك بنجاح!',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/adminDashboard/AdminPartners']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث بيانات الشريك. يرجى المحاولة لاحقًا.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }

  // دالة التحقق من صحة الرابط
  isValidUrl(url: string): boolean {
    const pattern = new RegExp('^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$', 'i');
    return pattern.test(url);
  }
}
