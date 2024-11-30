import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../URL Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
  jobForm: FormGroup;
  selectedImage: File | null = null; // To store the selected image file

  constructor(private fb: FormBuilder, private urlService: UrlService, private router: Router) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      image: [null], // Use null for files
      type: ['', Validators.required],
      link: [''],
      status: ['active'] // Default value for status
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = new FormData();

      // Append form fields
      formData.append('title', this.jobForm.get('title')?.value);
      formData.append('type', this.jobForm.get('type')?.value);
      formData.append('link', this.jobForm.get('link')?.value);
      formData.append('status', this.jobForm.get('status')?.value);

      // Append the image file if selected
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.urlService.addJob(formData).subscribe(
        response => {
          console.log('Job added successfully', response);
          this.jobForm.reset({ status: 'active' }); // Reset form with default status
          alert('تم إضافة الوظيفة بنجاح.');
          this.router.navigate(['/adminDashboard/JobsManagement']);
        },
        error => {
          console.error('Error adding job', error);
          alert('حدث خطأ أثناء إضافة الوظيفة.');
        }
      );
    }
  }
}
