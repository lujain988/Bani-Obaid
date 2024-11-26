import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandService } from '../../Lujain/Services/land.service';

@Component({
  selector: 'app-updat-north',
  templateUrl: './updat-north.component.html',
  styleUrls: ['./updat-north.component.css']
})
export class UpdatNorthComponent implements OnInit {
  northId: number | null = null; // Holds the ID of the entity being updated
  northData = {
    name: '',
    location: '',
    description: '',
    createdAt: new Date().toISOString(),
    image: null
  };
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null; // URL for the new image preview

  constructor(
    private landService: LandService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.northId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.northId) {
      this.getNorthById(this.northId);
    }
  }

  images: any[] = []; // Array to hold additional images

  // Fetch north entity by ID
  getNorthById(id: number): void {
    this.landService.getLandmarkById(id).subscribe(
      (data) => {
        console.log('Fetched North Data:', data); // Debugging line

        // Extract the 'land' object
        const north = data.land;
        this.northData = {
          name: north.name,
          location: north.location,
          description: north.description,
          createdAt: north.createdAt,
          image: north.image
        };

        // Filter images for this north entity
        this.images = data.images.filter((image: any) => image.landmarkId === id);
      },
      (error) => {
        console.error('Error fetching north data', error);
        alert('خطأ في جلب بيانات السياحة في الشمال.');
      }
    );
  }

  // Handle file selection for the image
  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      // Generate a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Update the north entity
  onUpdate(): void {
    if (!this.northData.name || !this.northData.location) {
      alert('يرجى ملء الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.northData.name);
    formData.append('Location', this.northData.location);
    formData.append('Description', this.northData.description);
    formData.append('CreatedAt', this.northData.createdAt);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    if (this.northId) {
      this.landService.updateLandmark(this.northId, formData).subscribe(
        () => {
          alert('تم تحديث السياحة في الشمال بنجاح.');
          this.router.navigate(['/adminDashboard/TourismInNorth']);
        },
        (error) => {
          console.error('Error updating north data', error);
          alert('فشل تحديث السياحة في الشمال. حاول مرة أخرى.');
        }
      );
    }
  }
}
