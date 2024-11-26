import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-president',
  templateUrl: './admin-president.component.html',
  styleUrl: './admin-president.component.css'
})
export class AdminPresidentComponent {
  ngOnInit() {
    this.getAllPresident()
  }

  constructor(private _ser: ServiceService, private router: Router) {
  }

  PresidentArray: any
  getAllPresident() {
    this._ser.getPresident().subscribe((data) => {
      this.PresidentArray = data
      console.log(this.PresidentArray, "this.PresidentArray")
    })
  }

  //deletePresidentById(id: any) {
  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: "You won't be able to revert this!",
  //    icon: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
  //    cancelButtonColor: '#d33',
  //    confirmButtonText: 'Yes, delete it!'
  //  }).then((result) => {
  //    if (result.isConfirmed) {
  //      this._ser.deletePresident(id).subscribe(
  //        () => {
  //          Swal.fire(
  //            'Deleted!',
  //            'This Category has been deleted successfully.',
  //            'success'
  //          );
  //          this.getAllPresident();
  //        },
  //        (error) => {
  //          if (error.status === 400) {
  //            Swal.fire(
  //              'Error',
  //              'Cannot delete this category because it contains products.',
  //              'error'
  //            );
  //          } else {
  //            Swal.fire(
  //              'Error',
  //              'An error occurred while deleting the category. Please try again.',
  //              'error'
  //            );
  //          }
  //        }
  //      );
  //    }
  //  });
  //}

}
