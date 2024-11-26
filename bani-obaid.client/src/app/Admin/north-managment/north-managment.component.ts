import { Component, OnInit } from '@angular/core';
import { LandService } from '../../Lujain/Services/land.service';

@Component({
  selector: 'app-north-managment',
  templateUrl: './north-managment.component.html',
  styleUrls: ['./north-managment.component.css']
})
export class NorthManagmentComponent implements OnInit {
  landmarks: any[] = []; // Array to hold landmarks data
  isLoading = true; // Loading state
  errorMessage: string | null = null; // Error message state

  constructor(private landService: LandService) { }

  ngOnInit(): void {
    this.fetchLandmarks();
  }

  // Fetch all landmarks
  fetchLandmarks(): void {
    this.isLoading = true;
    this.landService.getAllLandmarks().subscribe({
      next: (data) => {
        this.landmarks = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load landmarks. Please try again later.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Delete a landmark
  deleteLandmark(id: number): void {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المعلم؟')) {
      this.landService.deleteLandmark(id).subscribe({
        next: () => {
          // Remove the deleted landmark from the local array
          this.landmarks = this.landmarks.filter((landmark) => landmark.id !== id);
          alert('تم حذف المعلم بنجاح.');
        },
        error: (err) => {
          console.error(err);
          alert('فشل في حذف المعلم. حاول مرة أخرى.');
        }
      });
    }
  }
}
