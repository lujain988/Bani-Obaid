import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrl: './edit-member.component.css'
})
export class EditMemberComponent {
  param: string | null = null;
  MemberData: any = {
    name: '',
    role: '',
    image: ''
  };
  roles: string[] = ['عضو مجلس بلدي',
    //'رئيس المجلس', 'نائب رئيس المجلس', 'عضو إداري'
  ];
  image: SafeUrl | null = null;

  constructor(
    private _ser: ServiceService,
    private _active: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    if (this.param !== null) {
      this._ser.getMemberById(this.param).subscribe(
        (data) => {
          this.MemberData = data;
        },
        (error) => {
          console.error('Error fetching member data:', error);
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'تعذر تحميل بيانات العضو. يرجى المحاولة لاحقًا.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }

  imageChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  UpdateMember(data: any) {
    if (!data.name) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى إدخال اسم العضو.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!data.role) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى اختيار دور العضو.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!this.image && !this.MemberData.image) {
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
    formData.append('role', data.role || '');

    // إضافة الصورة إلى FormData إذا تم اختيار صورة جديدة
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0]);
    }

    if (this.param !== null) {
      const id = Number(this.param);
      this._ser.editMember(id, formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'تم التحديث بنجاح',
            text: 'تم تعديل بيانات العضو بنجاح!',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/adminDashboard/AdminMunicipalityMember']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث بيانات العضو. يرجى المحاولة لاحقًا.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }
}
