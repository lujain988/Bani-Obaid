import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tenders',
  templateUrl: './update-tenders.component.html',
  styleUrl: './update-tenders.component.css'
})
export class UpdateTendersComponent {
  param: any;
  tender: any = {};
  imageFile: File | null = null;
  img1File: File | null = null;
  img2File: File | null = null;
  img3File: File | null = null;
  img4File: File | null = null;
  img5File: File | null = null;

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');

    // Fetch the tender data to pre-fill the form
    this._ser.getTendersById(this.param).subscribe(response => {
      this.tender = response;
    }, error => {
      console.error("Error fetching tender data", error);
    });
  }

  constructor(private _ser: ServicesService, private _active: ActivatedRoute, private _router: Router) { }

  // Handle file selection
  changeImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  changeImg1(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.img1File = event.target.files[0];
    }
  }
  changeImg2(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.img2File = event.target.files[0];
    }
  }

  changeImg3(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.img3File = event.target.files[0];
    }
  }

  changeImg4(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.img4File = event.target.files[0];
    }
  }

  changeImg5(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.img5File = event.target.files[0];
    }
  }
 

  UpdateTender(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    
    if (this.imageFile) {
      form.append('Image', this.imageFile);
    }
    if (this.img1File) {
      form.append('Img1', this.img1File);
    }
    if (this.img2File) {
      form.append('Img2', this.img2File);
    }
    if (this.img3File) {
      form.append('Img3', this.img3File);
    }
    if (this.img4File) {
      form.append('Img4', this.img4File);
    }
    if (this.img5File) {
      form.append('Img5', this.img5File);
    }
    // Add other images similarly if they exist...

    this._ser.updateTenders(this.param, form).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم تعديل العطاء بنجاح',
          confirmButtonText: 'استمرار'
        }).then(() => {
          this._router.navigate(['adminDashboard/tenders']);
        });
      },
      error => {
        console.error("Error updating tender", error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء تعديل العطاء يرجى المحاولة لاحقا',
          confirmButtonText: 'استمرار'
        });
      }
    );
  }
}
