import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-structure',
  templateUrl: './edit-structure.component.html',
  styleUrl: './edit-structure.component.css'
})
export class EditStructureComponent {
  param: string | null = null;
  StructureData: any = {};
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
      this._ser.getStructureById(this.param).subscribe(
        (data) => {
          this.StructureData = data;
        },
        (error) => {
          console.error('Error fetching structure data:', error);
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

  UpdateStructure(data: any) {
    const formData = new FormData();

    // إضافة الحقول النصية إلى FormData
    formData.append('title', data.title || '');

    // إضافة الصورة إلى FormData إذا تم اختيار صورة جديدة
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0]);
    }

    if (this.param !== null) {
      const id = Number(this.param);
      this._ser.editStructure(id, formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'تم التحديث بنجاح',
            text: 'تم تعديل بيانات الهيكل التنظيمي بنجاح!',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/adminDashboard/structure']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث بيانات الهيكل التنظيمي.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }
}
