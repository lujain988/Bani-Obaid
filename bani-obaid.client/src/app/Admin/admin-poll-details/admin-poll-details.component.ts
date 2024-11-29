import { Component } from '@angular/core';
import { PollsService } from '../../Hosam/Services/pollsService';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-poll-details',
  templateUrl: './admin-poll-details.component.html',
  styleUrl: './admin-poll-details.component.css'
})
export class AdminPollDetailsComponent {
  Poll: any;
  Percentage: any;
  Count: any;
  Votes: any;
  constructor(private _ser: PollsService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    debugger;
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    if (id) {
      this.getPoll(id);
      this.getPrecentage(id);
      this.getVotes(id);
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

  getVotes(id: number): void {
    debugger;
    this._ser.getVotesByPollId(id).subscribe(
      (data) => {
        this.Votes = data.votes;
        this.Count = data.count;
      },
      (error) => {
        console.error('Error fetching Votes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch Votes: ' + (error.error.message || 'An error occurred.')
        });
      }
    );
  }


}
