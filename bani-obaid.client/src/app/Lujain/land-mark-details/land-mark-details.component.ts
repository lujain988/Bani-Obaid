import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LujainService } from '../Services/lujain.service';

declare var $: any; // Ensure jQuery is available for Owl Carousel

@Component({
  selector: 'app-land-mark-details',
  templateUrl: './land-mark-details.component.html',
  styleUrls: ['./land-mark-details.component.css']
})
export class LandMarkDetailsComponent implements AfterViewInit {
  landmark: any;
  images: string[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  isModalOpen = false;
  currentImage: string = '';
  currentImageIndex: number = 0;
  baseUrl: string = 'https://localhost:7243';

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
      this.isLoading = false;
      this.errorMessage = 'Invalid ID parameter in route';
    }
  }

  ngAfterViewInit(): void {
    // Initialize Owl Carousel after view is initialized
    $('.thm-owl__carousel').owlCarousel({
      items: 3,
      margin: 30,
      smartSpeed: 2000,
      loop: true,
      autoplay: false,
      autoplayTimeout: 3000,
      nav: false, // Disable navigation arrows
      dots: true, // Enable dots for navigation
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  }

  fetchLandmarkDetails(id: number): void {
    this._ser.getLandmarkById(id).subscribe(
      (data) => {
        this.landmark = data;
        console.log('Fetched Landmark Data:', data);
        this.isLoading = false;

        // Only include img1 to img7 if they exist
        this.images = [
          data.img1, data.img2, data.img3, data.img4, data.img5, data.img6, data.img7
        ].filter(img => !!img).map(img => `${this.baseUrl}${img}`);
      },
      (error) => {
        console.error('Error fetching landmark details:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load landmark details. Please try again later.';
      }
    );
  }


  // Modal logic here remains the same
  openModal(imageUrl: string, index: number): void {
    this.isModalOpen = true;
    this.currentImage = imageUrl;
    this.currentImageIndex = index;
  }

  closeModal(): void {
    this.isModalOpen = false;
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
