import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandService } from '../../Lujain/Services/land.service';

@Component({
  selector: 'app-add-new-north',
  templateUrl: './add-new-north.component.html',
  styleUrls: ['./add-new-north.component.css']
})
export class AddNewNorthComponent {
  newPlaceData = {
    name: '',
    location: '',
    description: '',
    createdAt: new Date().toISOString(),
    image: null
  };
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  constructor(private landService: LandService, private router: Router) { }

  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Add new place
  onAdd(): void {
    if (!this.newPlaceData.name || !this.newPlaceData.location) {
      alert('يرجى ملء الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.newPlaceData.name);
    formData.append('Location', this.newPlaceData.location);
    formData.append('Description', this.newPlaceData.description);
    formData.append('CreatedAt', this.newPlaceData.createdAt);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    this.landService.createLandmark(formData).subscribe(
      () => {
        alert('تمت إضافة المكان الجديد بنجاح.');
        this.router.navigate(['/adminDashboard/TourismInNorth']);
      },
      (error) => {
        console.error('Error adding new place', error);
        alert('فشل في إضافة المكان الجديد. حاول مرة أخرى.');
      }
    );
  }
}
