import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-image-home-page',
  templateUrl: './edit-image-home-page.component.html',
  styleUrls: ['./edit-image-home-page.component.css']
})
export class EditImageHomePageComponent {
  param: string | null = null;
  ImagesData: any = {
    homeTitle: '',
    homeDescription: '',
    homeImage: ''
  };

  homeImage: File | null = null;
  homeImagePreview: SafeUrl | null = null;

  constructor(
    private _ser: ServiceService,
    private _active: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    if (this.param !== null) {
      this._ser.getHomeImageById(this.param).subscribe(
        (data) => {
          this.ImagesData = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'تعذر تحميل بيانات الصورة. يرجى المحاولة لاحقًا.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }

  imageChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.homeImage = file;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.homeImagePreview = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  UpdatePartner(data: any) {
    if (!data.homeTitle) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى إدخال العنوان.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!data.homeDescription) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الإدخال',
        text: 'يرجى إدخال الوصف.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const formData = new FormData();
    formData.append('homeTitle', data.homeTitle || '');
    formData.append('homeDescription', data.homeDescription || '');

    if (this.homeImage) {
      formData.append('homeImage', this.homeImage);
    }

    if (this.param !== null) {
      const id = Number(this.param);
      this._ser.editHomeImage(id, formData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'تم التحديث بنجاح',
            text: 'تم تعديل بيانات الصورة بنجاح!',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/adminDashboard/AdminImageHomePage']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث بيانات الصورة. يرجى المحاولة لاحقًا.',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }
}
