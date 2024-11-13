
import { Component } from '@angular/core';
import { ServicesService } from '../DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  projectdata: any[] = [];

  constructor(private _ser: ServicesService) { }

  ngOnInit(): void {
    this.GetAllProject();
  }

  GetAllProject(): void {
    this._ser.getAllProjects().subscribe(
      (data) => {
        this.projectdata = data;
        console.log('Fetched project Data:', this.projectdata);
      },
      (error) => {
        console.error('Error fetching project data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch project data: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }



}
