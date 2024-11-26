import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LujainService } from '../../Lujain/Services/lujain.service';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-show-imgages-land-one',
  templateUrl: './show-imgages-land-one.component.html',
  styleUrls: ['./show-imgages-land-one.component.css']
})
export class ShowImgagesLandOneComponent implements OnInit {
  landmarkId: number | null = null;
  images: any[] = [];
  imageFile: File | null = null; // To store selected image file

  constructor(private lujainService: LujainService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.landmarkId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.landmarkId) {
      this.fetchImages(); // Load images for the current landmark
    }
  }

  fetchImages(): void {
    if (this.landmarkId) {
      this.lujainService.showImages(this.landmarkId).subscribe(
        (data) => {
          this.images = data;
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


  // Delete image
  deleteImage(imageId: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن يمكنك استعادة هذه الصورة!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم, حذفها!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.landmarkId) {
          this.lujainService.deleteLandmarkImage(imageId).subscribe(
            (response) => {
              console.log('Image deleted successfully for Landmark ID:', this.landmarkId);  // Log ID after deletion
              this.fetchImages();  // Refresh the images list after deletion
              Swal.fire('تم الحذف!', 'تم حذف الصورة بنجاح.', 'success');
            },
            (error) => {
              console.error('Error deleting image for Landmark ID:', this.landmarkId, error);  // Log error with ID
              Swal.fire('حدث خطأ!', 'لم يتم حذف الصورة.', 'error');
            }
          );
        }
      }
    });
  }
}
