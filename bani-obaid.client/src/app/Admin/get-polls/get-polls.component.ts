import { Component } from '@angular/core';
import { PollsService } from '../../Hosam/Services/pollsService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-polls',
  templateUrl: './get-polls.component.html',
  styleUrl: './get-polls.component.css'
})
export class GetPollsComponent {
  polls: any[] = [];
  selectedPoll: any = null;
  isEditMode: boolean = false;


  constructor(private pollService: PollsService, private router: Router) { }

  ngOnInit(): void {
    this.getPolls();
  }


  getPolls() {
    this.pollService.getAllPolls().subscribe(
      (data) => {
        this.polls = data;
      },
      (error) => {
        console.error('Error fetching polls', error);
      }
    );
  }

  addPoll() {
    this.router.navigate(['/adminDashboard/addPoll']);
  }

  editPoll(id: number) {
    this.router.navigate(['/adminDashboard/poll', id]);
  }

  deletePoll(id: number) {
    Swal.fire({
      title: 'هل أنت متأكد أنك تريد حذف هذا الاستطلاع؟',
      text: 'لن تتمكن من استرجاعه بعد الحذف!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم, احذف',
      cancelButtonText: 'لا, إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pollService.deletePoll(id).subscribe(
          () => {
            Swal.fire('تم الحذف!', 'تم حذف الاستطلاع بنجاح.', 'success');
            this.getPolls();
          },
          (error) => {
            Swal.fire('حدث خطأ!', 'حدث خطأ اثناء حذف الاستطلاع.', 'error');
            console.error('حدث خطأ اثناء حذف الاستطلاع', error);
          }
        );
      }
    });
  }
}
