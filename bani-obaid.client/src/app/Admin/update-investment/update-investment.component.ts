import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-investment',
  templateUrl: './update-investment.component.html',
  styleUrl: './update-investment.component.css'
})
export class UpdateInvestmentComponent {
  investmentId: any;
  investmentData: any = {};
  image: any;

  constructor(
    private _ser: ServicesService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.investmentId = this.route.snapshot.params['id'];
    this.getInvestmentDetails();
  }

  getInvestmentDetails(): void {
    // Fetch investment details by ID
    this._ser.getinvestmentsById(this.investmentId).subscribe(
      (data) => {
        this.investmentData = data;
      },
      (error) => {
        console.error('Error fetching investment details', error);
      }
    );
  }

  changeImage(event: any, field: string): void {
    const file = event.target.files[0];
    if (field === 'Image') {
      this.image = file;
    }
  }

  updateInvestment(data: any): void {
    // Validation: check if required fields are filled
    if (!data.Name || !data.Description || !data.FinalDate) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يجب تعبئة جميع الحقول المطلوبة',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Prepare the form data
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    if (this.image) {
      form.append('Image', this.image);
    }

    // Call the service to update the investment
    this._ser.updateinvestment(this.investmentId, form).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم تحديث الاستثمار بنجاح!',
          confirmButtonText: 'حسنًا'
        }).then(() => {
          this._router.navigate(['adminDashboard/invesments']);
        });
      },
      (error) => {
        console.error('Error updating investment', error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء تحديث الاستثمار. يرجى المحاولة مرة أخرى.',
          confirmButtonText: 'حسنًا'
        });
      }
    );
  }
}
