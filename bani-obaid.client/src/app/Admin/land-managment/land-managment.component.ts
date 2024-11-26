import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LujainService } from '../../Lujain/Services/lujain.service';

@Component({
  selector: 'app-land-managment',
  templateUrl: './land-managment.component.html',
  styleUrls: ['./land-managment.component.css']
})
export class LandManagmentComponent implements OnInit {
  landmarks: any[] = [];
  selectedLandmark: any = null; // لتخزين البيانات إذا لزم التعديل
  isEditMode: boolean = false; // لمعرفة إذا كانت النافذة للإضافة أو التعديل

  constructor(private lujainService: LujainService, private router: Router) { }

  ngOnInit(): void {
    this.getLandmarks();
  }

  // جلب جميع المعالم
  getLandmarks() {
    this.lujainService.getAllLandmarks().subscribe(
      (data) => {
        this.landmarks = data;
      },
      (error) => {
        console.error('حدث خطأ أثناء جلب المعالم', error);
      }
    );
  }

  // حذف معلم
  deleteLandmark(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المعلم؟')) {
      this.lujainService.deleteLandmark(id).subscribe(
        () => {
          alert('تم حذف المعلم بنجاح.');
          this.getLandmarks(); // تحديث قائمة المعالم
        },
        (error) => {
          console.error('حدث خطأ أثناء حذف المعلم', error);
        }
      );
    }
  }
}
