import { Component } from '@angular/core';
import { ServicesService } from '../DimaServices/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrl: './tender-details.component.css'
})
export class TenderDetailsComponent {
  tender: any; 
  tenderId: any;  

  constructor(
    private _ser: ServicesService,private route: ActivatedRoute ) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.tenderId = +params['id'];  
      this.getTenderbyId(this.tenderId);
    });
  }

  getTenderbyId(id: number): void {
    this._ser.getTendersById(id).subscribe(
      (data) => {
        this.tender = data;  
        console.log('Fetched tender data:', this.tender);
      },
      (error) => {
        console.error('Error fetching tender by ID:', error);
      }
    );
  }
  downloadImage(imageUrl: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;  
    link.target = '_blank';  
    link.download = imageUrl.split('/').pop() || 'downloaded-image'; 

   
    link.click();
  }
}


