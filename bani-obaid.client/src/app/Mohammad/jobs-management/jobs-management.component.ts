import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrl: './jobs-management.component.css'
})
export class JobManagementComponent implements OnInit {
  jobs: any[] = [];

  constructor(private urlService: UrlService, private router: Router) { }

  ngOnInit(): void {
    this.getJobs();
  }

  // Fetch the list of jobs
  getJobs() {
    this.urlService.getJobs().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  // Add a new job
  addJob() {
    // You can navigate to a separate form for adding a job or open a modal
    // For example:
    this.router.navigate(['/adminDashboard/addJob']); // Assuming /add-job is the route for the add job page
  }

  // Edit a job
  editJob(id: any) {
    // Navigate to the edit job page or open a modal with pre-filled form data
    this.router.navigate(['/adminDashboard/editJob', id]); // Assuming /edit-job/:id is the route for the edit job page
  }

  // Delete a job
  deleteJob(id: any) {
    if (confirm('هل انت متأكد أنك تريد حذف هذه الوظيفة؟')) {
      this.urlService.deleteJob(id).subscribe(
        () => {
          alert('تم حذف الوظيفة بنجاح.');
          this.getJobs(); // Refresh the job list after deletion
        },
        (error) => {
          console.error('Error deleting job', error);
        }
      );
    }
  }

  // Toggle activation status of a job
  toggleActivation(id: any) {
    this.urlService.editStatus(id).subscribe(
      () => {
        alert('تم تغيير حالة الوظيفة بنجاح.');
        this.getJobs(); // Refresh the job list after updating status
      },
      (error) => {
        console.error('Error updating job status', error);
      }
    );
  }
}
