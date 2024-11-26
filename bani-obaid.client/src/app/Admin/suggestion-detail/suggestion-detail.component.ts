import { Component } from '@angular/core';
import { ServicesService } from '../../Dima/DimaServices/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.css'
})
export class SuggestionDetailComponent {
  suggest: any;
  suggestId: any;

  constructor(
    private _ser: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.suggestId = +params['id'];
      this.getSuggestionbyId(this.suggestId);
    });
  }

  getSuggestionbyId(id: number): void {
    this._ser.getsuggestById(id).subscribe(
      (data) => {
        this.suggest = data;
        console.log('Fetched suggest data:', this.suggest);
      },
      (error) => {
        console.error('Error fetching suggest by ID:', error);
      }
    );
  }

}

