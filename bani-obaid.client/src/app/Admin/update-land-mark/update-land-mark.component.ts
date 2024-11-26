import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LujainService } from '../../Lujain/Services/lujain.service';

@Component({
  selector: 'app-update-land-mark',
  templateUrl: './update-land-mark.component.html',
  styleUrls: ['./update-land-mark.component.css']
})
export class UpdateLandMarkComponent implements OnInit {
  landmarkId: number | null = null;
  landmarkData = {
    name: '',
    location: '',
    description: '',
    createdAt: new Date().toISOString(),
    image: null
  };
  selectedFile: File | null = null;

  constructor(
    private lujainService: LujainService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.landmarkId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.landmarkId) {
      this.getLandmarkById(this.landmarkId);
    }
  }

  images: any[] = []; // Array to hold additional images
  getLandmarkById(id: number): void {
    this.lujainService.getLandmarkById(id).subscribe(
      (data) => {
        console.log('Fetched Landmark Data:', data); // Debugging line

        // Extract the 'land' object
        const land = data.land;
        this.landmarkData = {
          name: land.name,
          location: land.location,
          description: land.description,
          createdAt: land.createdAt,
          image: land.image
        };

        // Filter images for this landmark only
        this.images = data.images.filter((image: any) => image.landmarkId === id);
      },
      (error) => {
        console.error('Error fetching landmark data', error);
        alert('خطأ في جلب بيانات المعلم.');
      }
    );
  }



  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpdate(): void {
    if (!this.landmarkData.name || !this.landmarkData.location) {
      alert('يرجى ملء الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.landmarkData.name);
    formData.append('Location', this.landmarkData.location);
    formData.append('Description', this.landmarkData.description);
    formData.append('CreatedAt', this.landmarkData.createdAt);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    if (this.landmarkId) {
      this.lujainService.updateLandmark(this.landmarkId, formData).subscribe(
        () => {
          alert('تم تحديث المعلم بنجاح.');
          this.router.navigate(['/adminDashboard/Tourism']);
        },
        (error) => {
          console.error('Error updating landmark', error);
          alert('فشل تحديث المعلم. حاول مرة أخرى.');
        }
      );
    }
  }
}
