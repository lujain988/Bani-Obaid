import { Component } from '@angular/core';
import { ServicesService } from '../DimaServices/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  project: any;
  projectid: any;
  projectImages: any[] = [];
  latestProjects: any[] = [];

  constructor(
    private _ser: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.projectid = +params['id'];
      this.getProjectById(this.projectid);
      this.getLatestProjects();

    });
  }

  getProjectById(id: number): void {
    this._ser.getprojectById(id).subscribe(
      (data) => {
        this.project = data;
        this.projectImages = [
         
          this.project.img1,
          this.project.img2,
          this.project.img3,
          this.project.img4,
          this.project.img5,
          this.project.img6,
          this.project.img7,
          this.project.img8
        ].filter(img => img !== null); // Filter out null images
 // Assuming project.images is an array of images

        console.log('Fetched project data:', this.project);
        console.log('Project images:', this.projectImages);
      },
      (error) => {
        console.error('Error fetching project by ID:', error);
      }
    );
  }
  getLatestProjects(): void {
    this._ser.getAllProjects().subscribe(
      data => {
        console.log('Fetched all projects data:', data);

        // Ensure data is an array before filtering
        if (Array.isArray(data)) {
          this.latestProjects = data.filter(project => project.id !== this.projectid);
          console.log('Fetched latest projects excluding current project:', this.latestProjects);
        } else {
          console.error('Expected an array of projects, but got:', data);
        }
      },
      error => {
        console.error('Error fetching latest projects:', error);
      }
    );
  }
}


