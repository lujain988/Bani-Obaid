import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent {
  projectId: any;
  projectData: any = {};
  imageFields: any = {
    Image:null,
    Img1: null,
    Img2: null,
    Img3: null,
    Img4: null,
    Img5: null,
    Img6: null,
    Img7: null,
    Img8: null
  };

  constructor(
    private _ser: ServicesService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.getProjectDetails();
  }

  getProjectDetails(): void {
    // Fetch project details by ID
    this._ser.getprojectById(this.projectId).subscribe(
      (data) => {
        this.projectData = data;
      },
      (error) => {
        console.error('Error fetching project details', error);
      }
    );
  }

  changeImage(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFields[field] = file;
    }
  }

  updateProject(data: any): void {
    // Validation: check if required fields are filled
    if (!data.Title || !data.Description || !data.Percentage || !data.Status) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يجب تعبئة جميع الحقول المطلوبة',
        confirmButtonText: 'حسنًا'
      });
      return;
    }

    const formData = new FormData();
    formData.append('Title', data.Title);
    formData.append('Description', data.Description);
    formData.append('Percentage', data.Percentage);
    formData.append('Status', data.Status);

    // Append the updated images (only if selected)
    Object.keys(this.imageFields).forEach((field) => {
      if (this.imageFields[field]) {
        formData.append(field, this.imageFields[field]);
      }
    });

    this._ser.updateProject(this.projectId, formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'تم التحديث بنجاح',
          confirmButtonText: 'حسنًا'
        }).then(() => {
          this._router.navigate(['adminDashboard/projectAdmin']);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء التحديث',
          confirmButtonText: 'حسنًا'
        });
      }
    );
  }
}
