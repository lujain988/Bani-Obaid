import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-partners',
  templateUrl: './admin-partners.component.html',
  styleUrl: './admin-partners.component.css'
})
export class AdminPartnersComponent {
  PartnersArray: any;

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPartners();
  }

  getAllPartners() {
    this._ser.getPartner().subscribe((data) => {
      this.PartnersArray = data
      console.log(this.PartnersArray, "this.PartnersArray")
    })
  }

  deletePartners(id: any) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذا الإجراء!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذف!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deletePartner(id).subscribe(
          () => {
            Swal.fire(
              'تم الحذف!',
              'تم حذف الشريك بنجاح.',
              'success'
            );
            this.getAllPartners();
          },
          (error) => {
            if (error.status === 400) {
              Swal.fire(
                'خطأ',
                'لا يمكن حذف هذا الشريك لأنه يحتوي على معلومات مرتبطة.',
                'error'
              );
            } else {
              Swal.fire(
                'خطأ',
                'حدث خطأ أثناء محاولة حذف الشريك. يرجى المحاولة مرة أخرى.',
                'error'
              );
            }
          }
        );
      }
    });
  }

  navigateToAddPartners() {
    this.router.navigate(['/adminDashboard/AddPartner']);
  }


}
