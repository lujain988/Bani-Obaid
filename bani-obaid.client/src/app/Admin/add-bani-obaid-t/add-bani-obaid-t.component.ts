import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LujainService } from '../../Lujain/Services/lujain.service';

@Component({
  selector: 'app-add-bani-obaid-t',
  templateUrl: './add-bani-obaid-t.component.html',
  styleUrls: ['./add-bani-obaid-t.component.css']
})
export class AddBaniObaidTComponent {
  landmarkData = {
    name: '',
    location: '',
    description: '',
    createdAt: new Date().toISOString() // Default to current date
  };

  imageFile: File | null = null;

  constructor(private lujainService: LujainService, private router: Router) { }

  // Handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.imageFile = file;
    }

  }


  // Handle form submission
  onSubmit(): void {
    if (!this.landmarkData.name || !this.landmarkData.location) {
      alert('يرجى ملء الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();

    // Append data dynamically
    for (let key in this.landmarkData) {
      formData.append(key, (this.landmarkData as any)[key]);
    }

    // Append file if selected
    if (this.imageFile) {
      formData.append('Image', this.imageFile);
    }

    this.lujainService.createLandmark(formData).subscribe({
      next: (response) => {
        alert('تم إضافة المعلم بنجاح!');
        this.landmarkData = {
          name: '',
          location: '',
          description: '',
          createdAt: new Date().toISOString()
        };
        this.imageFile = null;
        this.router.navigate(['/adminDashboard/Tourism']);
      },
      error: (error) => {
        console.error('Error creating landmark:', error);
        alert('فشل إضافة المعلم. حاول مرة أخرى.');
      }
    });

  }

}
