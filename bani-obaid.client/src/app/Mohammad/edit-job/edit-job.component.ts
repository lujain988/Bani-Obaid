import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../URL Service/url.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  editJobForm: FormGroup;
  jobId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form with the correct controls
    this.editJobForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      type: ['', Validators.required],
      link: [''],
      status: ['active'] // Default status
    });
  }

  ngOnInit(): void {
    // Retrieve the job ID and load job details for editing
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.loadJobDetails(this.jobId);
    }
  }

  loadJobDetails(id: string): void {
    this.urlService.getJobDetails(id).subscribe(jobDetails => {
      // Ensure the form is updated with existing job data
      this.editJobForm.patchValue({
        title: jobDetails.title,
        image: jobDetails.image,
        type: jobDetails.type,
        link: jobDetails.link,
        status: jobDetails.status
      });
    });
  }

  onSubmit(): void {
    if (this.editJobForm.valid && this.jobId) {
      const formData = new FormData();

      // تحويل القيم إلى FormData
      formData.append('title', this.editJobForm.get('title')?.value || '');
      formData.append('image', this.editJobForm.get('image')?.value || '');
      formData.append('type', this.editJobForm.get('type')?.value || '');
      formData.append('link', this.editJobForm.get('link')?.value || '');
      formData.append('status', this.editJobForm.get('status')?.value || 'active');

      // استدعاء دالة الخدمة مع FormData
      this.urlService.editJob(this.jobId, formData).subscribe(response => {
        console.log('Job updated successfully', response);
        alert('تم تعديل الوظيفة بنجاح .'); // Show success message
        this.router.navigate(['/JobsManagement']);      });
    }
  }

}
