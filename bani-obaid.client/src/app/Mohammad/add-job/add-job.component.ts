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

  constructor(private fb: FormBuilder, private urlService: UrlService, private router: Router) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      type: ['', Validators.required],
      link: [''],
      status: ['active'] // Default value for status
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.urlService.addJob(this.jobForm.value).subscribe(response => {
        console.log('Job added successfully', response);
        this.jobForm.reset({ status: 'active' }); // Reset form with default status
        alert('تم اضافة الوظيفة بنجاح .'); // Show success message
        this.router.navigate(['/JobsManagement']);
      });
    }
  }
}
