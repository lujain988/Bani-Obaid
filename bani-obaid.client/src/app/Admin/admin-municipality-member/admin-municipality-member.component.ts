import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-municipality-member',
  templateUrl: './admin-municipality-member.component.html',
  styleUrl: './admin-municipality-member.component.css'
})
export class AdminMunicipalityMemberComponent {
  MemberArray: any;

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  CategoryArray: any
  getAllMembers() {
    this._ser.getMember().subscribe((data) => {
      this.MemberArray = data
      console.log(this.MemberArray, "this.MemberArray")
    })
  }

  deleteMember(id: any) {
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
        this._ser.deleteMember(id).subscribe(
          () => {
            Swal.fire(
              'تم الحذف!',
              'تم حذف العضو بنجاح.',
              'success'
            );
            this.getAllMembers();
          },
          (error) => {
            if (error.status === 400) {
              Swal.fire(
                'خطأ',
                'لا يمكن حذف هذا العضو لأنه يحتوي على منتجات مرتبطة.',
                'error'
              );
            } else {
              Swal.fire(
                'خطأ',
                'حدث خطأ أثناء محاولة حذف العضو. يرجى المحاولة مرة أخرى.',
                'error'
              );
            }
          }
        );
      }
    });
  }


  navigateToAddMember() {
    this.router.navigate(['/adminDashboard/AddMember']);
  }

}
