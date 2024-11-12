import { Component } from '@angular/core';
import { UrlService } from '../URL Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobDetails: any;
  latestJobs: any[] = [];
  strId: any;
  constructor(private _ser: UrlService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the 'id' parameter from the URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchJobDetails(id);
        this.fetchLatestJobs(this.strId); // Fetch other job opportunities
      }
    });
  }

  fetchJobDetails(id: any) {
    // Fetch job details based on the provided 'id'
    this._ser.getJobDetails(id).subscribe(jobDetails => {
      this.jobDetails = jobDetails;

      // Set `strId` based on different job types
      switch (this.jobDetails.type) {
        case '1':
          this.strId = 1;
          break;
        case '2':
          this.strId = 2;
          break;
        // Add more cases as needed
        default:
          this.strId = 0; // Default value
      }

      // Fetch other job opportunities based on `strId`
      this.fetchLatestJobs(this.strId);
    });
  }


  

  fetchLatestJobs(strId: any) {
    debugger
    // Fetch other job opportunities for the sidebar
    this._ser.getAllJobs(this.strId).subscribe(latestJobs => {
      this.latestJobs = latestJobs;
    });
  }
}
