import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandService } from '../Services/land.service';

@Component({
  selector: 'app-general-land-details',
  templateUrl: './general-land-details.component.html',
  styleUrls: ['./general-land-details.component.css']
})
export class GeneralLandDetailsComponent implements OnInit, AfterViewInit {
  landmark: any = null; // Landmark details
  images: string[] = []; // Array to store additional image URLs
  isLoading: boolean = true; // Loading state
  errorMessage: string = ''; // Error message
  isModalOpen = false; // Modal open state
  currentImage: string = ''; // Current image displayed in modal
  currentImageIndex: number = 0; // Index of the current image

  constructor(
    private route: ActivatedRoute,
    private landService: LandService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    if (id) {
      this.fetchLandmarkDetails(id);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Invalid ID parameter in route';
      console.error(this.errorMessage);
    }
  }

  ngAfterViewInit(): void {
    // Any necessary jQuery initialization can go here
  }

  fetchLandmarkDetails(id: number): void {
    this.landService.getLandmarkById(id).subscribe(
      (data) => {
        console.log('Fetched Data:', data);

        if (data) {
          this.landmark = data.land;
          console.log('Landmark Details:', this.landmark);

          // Directly map the images from the `Images` property
          this.images = data.images
            ? data.images.map((img: any) => `https://localhost:7243${img.image}`) // Prepend the base URL
            : [];
          console.log('Additional Images:', this.images);
        } else {
          this.errorMessage = 'Landmark details not available.';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching landmark details:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load landmark details. Please try again later.';
      }
    );
  }

  openModal(imageUrl: string, index: number): void {
    this.isModalOpen = true;
    this.currentImage = imageUrl;
    this.currentImageIndex = index;
    document.body.classList.add('modal-open'); // Disable scrolling on background
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open'); // Enable scrolling on background
  }

  stopPropagation(event: Event): void {
    event.stopPropagation(); // Prevent click event on modal content from closing the modal
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.currentImage = this.images[this.currentImageIndex];
  }

  previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentImageIndex];
  }
}
