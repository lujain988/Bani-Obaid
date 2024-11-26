import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects-admin',
  templateUrl: './projects-admin.component.html',
  styleUrl: './projects-admin.component.css'
})
export class ProjectsAdminComponent {

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


  deleteproject(projectId: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هل تريد حقا حذف المشروع؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'تراجع',
      confirmButtonText: 'نعم , قم بالحذف'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteProject(projectId).subscribe(
          () => {
            console.log('project deleted with ID:', projectId);

            // Refresh the tender data
            this.GetAllProject();

            Swal.fire(
              '! حذف ',
              'لقد تم حذف المشروع بنجاح',
              'success'
            );
          },
          (error) => {
            console.error('مشكلة في حذف المشروع:', error);
            Swal.fire(
              'Error!',
              'هناك مشكلة مؤقتة ,يؤجى المحاولة لاحقا',
              'error'
            );
          }
        );
      }
    });
  }

}
