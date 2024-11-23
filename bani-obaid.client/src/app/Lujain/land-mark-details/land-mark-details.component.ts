import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LujainService } from '../Services/lujain.service';

declare var $: any; // Ensure jQuery is available for Owl Carousel

@Component({
  selector: 'app-land-mark-details',
  templateUrl: './land-mark-details.component.html',
  styleUrls: ['./land-mark-details.component.css']
})
export class LandMarkDetailsComponent implements OnInit, AfterViewInit {
  landmark: any;
  images: string[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  isModalOpen = false;
  currentImage: string = '';
  currentImageIndex: number = 0;

  // Set baseUrl for localhost
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
    $('.thm-owl__carousel').owlCarousel({
      items: 3,
      margin: 30,
      smartSpeed: 2000,
      loop: true,
      autoplay: false,
      autoplayTimeout: 3000,
      nav: false,
      dots: true,
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
        // Log the entire data object to see the structure
        console.log("Fetched Data:", data);

        // Log specific properties for debugging
        if (data && data.land) {
          this.landmark = data.land;
          console.log("Landmark Data:", this.landmark);  // Log the landmark data

          // Construct full URL for main image
          if (this.landmark.image) {
            console.log("Landmark Image URL:", this.landmark.image);  // Log the image path
            this.landmark.image = `${this.baseUrl}${this.landmark.image}`;
          }

          // Log additional images if available
          this.images = data.images ? data.images.map((img: any) => `${this.baseUrl}${img.imageUrl}`) : [];
          console.log("Additional Images:", this.images);
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
