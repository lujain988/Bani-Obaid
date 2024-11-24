import { Component } from '@angular/core';
import { PollsService } from '../Services/pollsService';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrl: './poll-details.component.css'
})
export class PollDetailsComponent {
  Poll: any;
  Percentage: any;
  formData = {
    NationalId: '',
    Message: '',
    VoteRate: ''
  };
  constructor(private _ser: PollsService, private route: ActivatedRoute,) { }

    ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      const id = idParam ? +idParam : 0;

      if(id) {
        this.getPoll(id);
        this.getPrecentage(id);
      } else {
        console.error('Invalid ID parameter in route');
      }
    }
  

  getPoll(id: number): void {
    this._ser.getPollById(id).subscribe(
      (data) => {
        this.Poll = data;
      },
      (error) => {
        console.error('Error fetching Poll:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch Poll: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }

  getPrecentage(id: number): void {
    this._ser.getPullPercentage(id).subscribe(
      (data) => {
        this.Percentage = data;
      },
      (error) => {
        console.error('Error fetching Percentage:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch Percentage: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }

  onSubmit(form: any): void {
    debugger
    if (form.valid) {
      const idParam = this.route.snapshot.paramMap.get('id');
      const id = idParam ? +idParam : 0;
      const formData = new FormData();

      formData.append('NationalId', form.value.NationalId);
      formData.append('Message', form.value.Message);
      formData.append('VoteRate', form.value.VoteRate);

      this._ser.postVote(id, formData).subscribe(
        (response: any) => {
          if (response === 1) {
            Swal.fire({
              icon: 'success',
              title: '!شكرا لك',
              text: 'لقد تم احتساب صوتك بنجاح'
            });
            this.getPrecentage(id);
          } else if (response === 11) {
            Swal.fire({
              icon: 'info',
              title: '!شكرا لك',
              text: 'لقد تم تعديل صوتك بنجاح'
            });
            this.getPrecentage(id);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'حدث خطأ',
              text: 'حدث خطأ يرجى اعادة المحاولة'
            });
          }
        },
        (error) => {
          console.error('Error submitting vote:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to submit vote: ' + (error.error.message || 'An error occurred.')
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'مدخلات خاطئة',
        text: 'يرجى ادخال معلومات صحيحة'
      });
    }
  }

}
