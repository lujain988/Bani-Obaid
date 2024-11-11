import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LujainService } from '../Services/lujain.service';

@Component({
  selector: 'app-land-mark-details',
  templateUrl: './land-mark-details.component.html',
  styleUrl: './land-mark-details.component.css'
})
export class LandMarkDetailsComponent {
  landmark: any; 

  constructor(
    private route: ActivatedRoute,
    private _ser: LujainService 
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    if (id) {
      this.fetchLandmarkDetails(id);
    } else {
      console.error('Invalid ID parameter in route');
    }
  }

  fetchLandmarkDetails(id: number): void {
    this._ser.getLandmarkById(id).subscribe(
      (data) => {
        this.landmark = data;
      },
      (error) => {
        console.error('Error fetching landmark details:', error);
      }
    );
  }
}
