import { Component, OnInit } from '@angular/core';
import { LujainService } from '../../Lujain/Services/lujain.service'; // Import your service

@Component({
  selector: 'app-get-complains',
  templateUrl: './get-complains.component.html',
  styleUrls: ['./get-complains.component.css']
})
export class GetComplainsComponent implements OnInit {
  complains: any[] = []; // Array to hold complaints

  constructor(private lujainService: LujainService) { }

  ngOnInit(): void {
    this.fetchComplains(); // Fetch complaints when component is initialized
  }

  fetchComplains(): void {
    this.lujainService.ShowComplains().subscribe(
      (response) => {
        this.complains = response.complains || []; // Store the complaints data
      },
      (error) => {
        console.error('Error fetching complaints:', error);
      }
    );
  }

  // Open the image in a new tab when clicked
  openImageInNewTab(image: string): void {
    const imageUrl = 'https://localhost:7243/' + image; // Construct the full image URL
    window.open(imageUrl, '_blank'); // Open the image in a new tab
  }
}
