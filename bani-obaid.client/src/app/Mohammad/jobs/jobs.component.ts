import { Component } from '@angular/core';
import { UrlService } from '../URL Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  jobData: any[] = [];


  constructor(private _ser: UrlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchJobs(id);
      }
    });
  }

  fetchJobs(id: any) {
    this._ser.getAllJobs(id).subscribe(data => {
      this.jobData = data;
    });
  }
}
