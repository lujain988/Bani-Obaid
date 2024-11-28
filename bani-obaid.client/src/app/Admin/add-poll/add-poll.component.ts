import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PollsService } from '../../Hosam/Services/pollsService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrl: './add-poll.component.css'
})
export class AddPollComponent {
  pollData = {
    title: '',
    description: '',
    createdAt: new Date().toISOString().split('T')[0],
    closeAt: ''
  };

  imageFile: File | null = null;

  constructor(private pollsService: PollsService, private router: Router) { }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.imageFile = file;
    }

  }


  onSubmit(): void {
    debugger;
    if (!this.pollData.title || !this.pollData.description || !this.pollData.closeAt) {
      alert('يرجى ملء الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();

    for (let key in this.pollData) {
      formData.append(key, (this.pollData as any)[key]);
    }

    if (this.imageFile) {
      formData.append('Image', this.imageFile);
    }

    this.pollsService.addPoll(formData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '!تم',
          text: 'تم إضافة الاسنطلاع بنجاح!'
        });
        this.pollData = {
          title: '',
          description: '',
          createdAt: new Date().toISOString().split('T')[0],
          closeAt: ''
        };
        this.imageFile = null;
        this.router.navigate(['/adminDashboard/polls']);
      },
      error: (error) => {
        console.error('Error creating poll:', error);
        Swal.fire({
          icon: 'warning',
          title: 'حدث خطأ',
          text: 'فشل إضافة الاستطلاع. حاول مرة أخرى.'
        });
      }
    });

  }

}
