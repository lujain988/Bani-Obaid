import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-image-home-page',
  templateUrl: './admin-image-home-page.component.html',
  styleUrls: ['./admin-image-home-page.component.css']
})
export class AdminImageHomePageComponent {
  ngOnInit() {
    this.getImagesForHomePage();
  }

  constructor(private _ser: ServiceService, private router: Router) { }

  ImagesHomePageArray: any[] = [];  

  getImagesForHomePage() {
    this._ser.getHomeImage().subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.ImagesHomePageArray = data; 
          console.log(this.ImagesHomePageArray, "this.ImagesHomePageArray");
        } else {
          console.error("لا توجد بيانات");
          this.ImagesHomePageArray = []; 
        }
      },
      (error) => {
        console.error("حدث خطأ أثناء تحميل الصور:", error);
        this.ImagesHomePageArray = []; 
      }
    );
  }

  deleteImagesForHomePage(id: any) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذا الإجراء!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذف!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteHomeImage(id).subscribe(
          () => {
            Swal.fire(
              'تم الحذف!',
              'تم حذف الصورة بنجاح.',
              'success'
            );
            this.getImagesForHomePage(); // إعادة تحميل الصور بعد الحذف
          },
          (error) => {
            if (error.status === 400) {
              Swal.fire(
                'خطأ',
                'لا يمكن حذف هذه الصورة لأنها تحتوي على بيانات مرتبطة.',
                'error'
              );
            } else {
              Swal.fire(
                'خطأ',
                'حدث خطأ أثناء محاولة حذف الصورة. يرجى المحاولة مرة أخرى.',
                'error'
              );
            }
          }
        );
      }
    });
  }

  navigateToAddImges() {
    this.router.navigate(['/adminDashboard/AddImageHomePage']);
  }
}
