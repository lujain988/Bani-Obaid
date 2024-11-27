import { Component, OnInit } from '@angular/core';
import { LandService } from '../../Lujain/Services/land.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-image-for-north',
  templateUrl: './show-image-for-north.component.html',
  styleUrls: ['./show-image-for-north.component.css']
})
export class ShowImageForNorthComponent implements OnInit {
  landmarkId: number | null = null;
  images: any[] = [];
  imageFile: File | null = null; // To store selected image file

  constructor(private lujainService: LandService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.landmarkId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.landmarkId) {
      this.fetchImages();
    }
  }
  fetchImages(): void {
    if (this.landmarkId) {
      this.lujainService.showImages(this.landmarkId).subscribe(
        (data) => {
          console.log('API Response:', data); // Log raw API response
          this.images = data;
          console.log('Mapped Images:', this.images); // Log mapped images
        },
        (error) => {
          console.error('Error fetching images:', error);
        }
      );
    }
  }
  // Handle file selection
  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file; // Store selected file
    }
  }
  onImageUpload(): void {
    if (this.imageFile && this.landmarkId) {
      const formData = new FormData();
      formData.append('additionalImages', this.imageFile); // Append the selected image as an array

      console.log('Uploading image for Landmark ID:', this.landmarkId);

      // Call the service to add the image
      this.lujainService.addAdditionalImages(this.landmarkId, formData).subscribe(
        (response) => {
          console.log('Image added successfully to Landmark ID:', this.landmarkId);  // Log ID after upload
          this.fetchImages();  // Refresh the image list after adding the new image
          Swal.fire('تم الإضافة!', 'تم إضافة الصورة بنجاح.', 'success');
          this.imageFile = null; // Clear the selected image after upload
        },
        (error) => {
          console.error('Error uploading image for Landmark ID:', this.landmarkId, error);  // Log error with ID
          Swal.fire('حدث خطأ!', 'لم يتم إضافة الصورة.', 'error');
        }
      );
    }
  }

 deleteImage(imageId: number): void {
    console.log('Attempting to delete image with ID:', imageId); // Log for debugging
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن يمكنك استعادة هذه الصورة!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم, احذفها!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lujainService.deleteLandmarkImage(imageId).subscribe(
          () => {
            Swal.fire('تم الحذف!', 'تم حذف الصورة بنجاح.', 'success');
            this.fetchImages(); // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting image:', error);
            Swal.fire('حدث خطأ!', 'لم يتم حذف الصورة.', 'error');
          }
        );
      }
    });
  }

}
