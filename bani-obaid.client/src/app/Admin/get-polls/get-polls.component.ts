import { Component } from '@angular/core';
import { PollsService } from '../../Hosam/Services/pollsService';
import { Router } from '@angular/router';

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
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الاستطلاع؟')) {
      this.pollService.deletePoll(id).subscribe(
        () => {
          alert('تم حذف الاستطلاع بنجاح.');
          this.getPolls();
        },
        (error) => {
          console.error('حدث خطأ اثناء حذف الاستطلاع', error);
        }
      );
    }
  }
}
