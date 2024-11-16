import { Component, ViewChild } from '@angular/core';
import { LujainService } from '../Services/lujain.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent {
  @ViewChild('complaintForm') complaintForm!: NgForm; // Reference to the form
  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;

  constructor(private lujainService: LujainService) { }

  // Handle file selection
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Get file preview
  getFilePreview(): string {
    return this.selectedFile ? URL.createObjectURL(this.selectedFile) : 'https://ramtha.gov.jo/no-image.jpg';
  }

  // Submit complaint
  submitComplaint(formData: { [key: string]: any }): void {
    // Check if the form is invalid
    if (this.complaintForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'يرجى ملىء جميع الحقول المطلوبة',
        text: ' (*) الرجاء التأكد من إدخال جميع الحقول المسبوقة بعلامة',
        confirmButtonText: 'موافق'
      });
      return; // Stop the submission
    }

    const data = new FormData();

    // Append form data fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    // Append file only if selected
    if (this.selectedFile) {
      data.append('Image', this.selectedFile);
    }

    this.lujainService.postComplain(data).subscribe(
      (response) => {
        this.successMessage = response.message || 'تم إرسال الشكوى بنجاح!';
        this.errorMessage = '';

        Swal.fire({
          icon: 'success',
          title: 'تم الإرسال',
          text: 'تم إرسال الشكوى بنجاح!',
          confirmButtonText: 'حسنًا'
        });

        // Reset the form and selected file
        this.selectedFile = null;
        this.complaintForm.resetForm(); // Reset the form
      },
      (error) => {
        this.errorMessage = error.error?.message || 'حدث خطأ أثناء إرسال الشكوى.';
        this.successMessage = '';

        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء إرسال الشكوى.',
          confirmButtonText: 'حسنًا'
        });
      }
    );
  }
}
