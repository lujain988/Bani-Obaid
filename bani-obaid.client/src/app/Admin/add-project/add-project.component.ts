import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectData: any = {};
  mainImage: any = null;

  // Individual optional images
  img1: any = null;
  img2: any = null;
  img3: any = null;
  img4: any = null;
  img5: any = null;
  img6: any = null;
  img7: any = null;
  img8: any = null;
  constructor(private _ser: ServicesService, private _router: Router) { }
  changeImage(event: any, field: string): void {
    const file = event.target.files[0];
    switch (field) {
      case 'Image':
        this.mainImage = file;
        break;
      case 'Img1':
        this.img1 = file;
        break;
      case 'Img2':
        this.img2 = file;
        break;
      case 'Img3':
        this.img3 = file;
        break;
      case 'Img4':
        this.img4 = file;
        break;
      case 'Img5':
        this.img5 = file;
        break;
      case 'Img6':
        this.img6 = file;
        break;
      case 'Img7':
        this.img7 = file;
        break;
      case 'Img8':
        this.img8 = file;
        break;
    }
  }


  addProject(data: any): void {
    if (!this.mainImage) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'الصورة الرئيسية مطلوبة!',
        confirmButtonText: 'حسنًا'
      });
      return;
    }

    // Prepare form data
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('Image', this.mainImage);

    // Append optional images if provided
    if (this.img1) formData.append('Img1', this.img1);
    if (this.img2) formData.append('Img2', this.img2);
    if (this.img3) formData.append('Img3', this.img3);
    if (this.img4) formData.append('Img4', this.img4);
    if (this.img5) formData.append('Img5', this.img5);
    if (this.img6) formData.append('Img6', this.img6);
    if (this.img7) formData.append('Img7', this.img7);
    if (this.img8) formData.append('Img8', this.img8);


    // Submit the form
    this._ser.createProject(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم إضافة المشروع بنجاح!',
          confirmButtonText: 'حسنًا'
        }).then(() => {
          this._router.navigate(['adminDashboard/projectAdmin']);
        });
      },
      (error) => {
        console.error('Error adding project:', error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء إضافة المشروع. يرجى المحاولة مرة أخرى.',
          confirmButtonText: 'حسنًا'
        });
      }
    );
  }
}
