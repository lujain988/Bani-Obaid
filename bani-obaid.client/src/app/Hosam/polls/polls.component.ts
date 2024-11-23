import { Component } from '@angular/core';
import { PollsService } from '../Services/pollsService';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.css'
})
export class PollsComponent {

  Polls: any[] = [];
  constructor(private _ser: PollsService) { }

  ngOnInit(): void {
    this.getAllPolls();
  }

  getAllPolls(): void {
    this._ser.getAllPolls().subscribe(
      (data) => {
        this.Polls = data;
      },
      (error) => {
        console.error('Error fetching Polls:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch Polls: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }


}

